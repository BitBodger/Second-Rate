import express from 'express';
import { registerUser, loginUser, getAllUsers } from '../controllers/userController.js';

const router = express.Router();

// Register routes with pool reference
const userRoutes = (pool) => {
  router.post('/auth/register', registerUser(pool));
  router.get('/', getAllUsers(pool));
  router.post('/auth/login', loginUser(pool));

  return router;
};

export default userRoutes;
