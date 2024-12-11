import { User } from '../models/index.js';
import { Thought } from '../models/index.js';

/**
 * GET All Users /users
 * @returns an array of Users
 */
export const getAllUsers = async (_req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/**
 * GET User based on id /users/:id
 * @param string id
 * @returns a single User object
 */
export const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId)
      .populate({
        path: 'thoughts',
        select: '-__v' // Exclude the __v field
      })
      .populate({
        path: 'friends',
        select: '-__v' // Exclude the __v field
      });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        message: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/**
 * POST Create a new User /users
 * @param object user
 * @returns the created User object
 */
export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/**
 * PUT Update a User /users/:userId
 * @param string id
 * @param object user
 * @returns the updated User object
 */
export const updateUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        message: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/**
 * DELETE Remove a User /users/:userId
 * @param string id
 * @returns a success message
 */
export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (user) {
      res.json({
        message: 'User deleted successfully'
      });
    } else {
      res.status(404).json({
        message: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// BONUS: Delete a user and all associated thoughts
export const deleteUserAndThoughts = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (user) {
      await Thought.deleteMany({ username: user.username });
      res.json({
        message: 'User and associated thoughts deleted successfully'
      });
    } else {
      res.status(404).json({
        message: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/**
 * POST Add a friend to a User /users/:userId/friends/:friendId
 * @param string userId
 * @param string friendId
 * @returns the updated User object
 */
export const addFriend = async (req, res) => {
  const { userId, friendId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    ).populate('friends');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        message: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/**
 * DELETE Remove a friend from a User /users/:userId/friends/:friendId
 * @param string userId
 * @param string friendId
 * @returns the updated User object
 */
export const deleteFriend = async (req, res) => {
  const { userId, friendId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    ).populate('friends');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        message: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/**
 * GET All friends of a User /users/:userId/friends
 * @param string userId
 * @returns an array of friends
 */
export const getFriends = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate('friends');
    if (user) {
      res.json(user.friends);
    } else {
      res.status(404).json({
        message: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};