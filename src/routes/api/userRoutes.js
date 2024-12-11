import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deleteUserAndThoughts,
  addFriend,
  deleteFriend,
  getFriends
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
  .delete(deleteUserAndThoughts);

// /api/users/:userId/friends/:friendId
userRouter
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

// /api/users/:userId/friends
userRouter
  .route('/:userId/friends')
  .get(getFriends);

export default userRouter;