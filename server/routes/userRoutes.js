import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // Import the User model
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();


// Use the JWT secret from the environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Register a new user (POST /auth/register)
router.post('/auth/register', async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    // Check if the user already exists by email or username
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      username,  // Ensure the username is stored
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate a JWT token including the username
    const token = jwt.sign({ id: newUser._id, username: newUser.username }, JWT_SECRET, { expiresIn: '1h' });

    // Send the token and user info as a response
    res.status(201).json({ token, user: { name: newUser.name, username: newUser.username, email: newUser.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user: ' + error.message });
  }
});

// Get all users (GET /users)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users: ' + error.message });
  }
});

// Login user (POST /auth/login)
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token and include the username in the payload
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    // Send the token and user info as a response
    res.json({ token, user: { username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in: ' + error.message });
  }
});

export default router;
