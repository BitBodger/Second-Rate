import express from 'express';
import userRoutes from './routes/userRoutes.js';
import filmRoutes from './routes/filmRoutes.js';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(express.json());

// API routes
app.use('/api/users', userRoutes);  // Pass pool instance to user routes
app.use('/api/films', filmRoutes);

// Serve the frontend React app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Create HTTP server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
