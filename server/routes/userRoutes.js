import express from 'express';
import { registerUser, loginUser, getAllUsers } from '../controllers/userController.js';

const router = express.Router();

const userRoutes = () => {
  router.post('/auth/register', registerUser); // Do not call the function
  router.get('/', getAllUsers); // Just pass the function reference
  router.post('/auth/login', loginUser); // Do not call the function

  return router;
};

export default userRoutes
