import express from 'express';
import mongoose from 'mongoose';
import 'module-alias/register.js'; // Importing module alias
import userRoutes from './routes/userRoutes.js';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;  // Secret for verifying JWTs

// Middleware
app.use(express.json());

// API routes
app.use('/api', userRoutes);

// Serve the frontend React app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

// Create HTTP server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

