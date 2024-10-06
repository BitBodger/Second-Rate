import * as userModel from '../models/User.js'; // Import the User model functions
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

// Use the JWT secret from the environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Register a new user (POST /auth/register)
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists by email or username
    const existingUser = await userModel.findUserByEmailOrUsername(email, username);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await userModel.createUser(username, email, hashedPassword);

    // Generate a JWT token including the username
    const token = jwt.sign({ id: newUser.id, username: newUser.username }, JWT_SECRET, { expiresIn: '1h' });

    // Send the token and user info as a response
    res.status(201).json({ token, user: { username: newUser.username, email: newUser.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user: ' + error.message });
  }
};

// Get all users (GET /users)
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers(); // Fetch all users using the model
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users: ' + error.message });
  }
};

// Login user (POST /auth/login)
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token and include the username in the payload
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    // Send the token and user info as a response
    res.json({ token, user: { username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in: ' + error.message });
  }
};
