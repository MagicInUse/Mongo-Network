import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deleteUserAndThoughts,
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
  .get(getUserById).populate('thoughts').populate('friends')
  .put(updateUser)
  .delete(deleteUserAndThoughts);

// /api/users/:userId/friends/:friendId
userRouter
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

export default userRouter;