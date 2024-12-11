import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../../controllers/userController.js';

const userRouter = Router();

// /api/users
userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// /api/users/:userId
userRouter
  .route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

export default userRouter;