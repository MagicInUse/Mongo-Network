import Thought from '../models/thought.js';
import User from '../models/user.js';

/**
 * GET All Thoughts /thoughts
 * @returns an array of Thoughts
 */
export const getAllThoughts = async (_req, res) => {
  try {
    const thoughts = await Thought.find().select('-__v'); // Exclude the __v field
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/**
 * GET Thought based on id /thoughts/:thoughtId
 * @param string thoughtId
 * @returns a single Thought object
 */
export const getThoughtById = async (req, res) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findById(thoughtId).select('-__v'); // Exclude the __v field
    if (thought) {
      res.json(thought);
    } else {
      res.status(404).json({
        message: 'Thought not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/**
 * POST Create a new Thought /thoughts
 * @param object thought
 * @returns the created Thought object
 */
export const createThought = async (req, res) => {
  try {
    const thought = new Thought(req.body);
    await thought.save();

    // Push the created thought's _id to the associated user's thoughts array field
    await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: thought._id } },
      { new: true }
    );

    res.status(201).json(thought);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/**
 * PUT Update a Thought /thoughts/:thoughtId
 * @param string thoughtId
 * @param object thought
 * @returns the updated Thought object
 */
export const updateThought = async (req, res) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findByIdAndUpdate(thoughtId, req.body, { new: true });
    if (thought) {
      res.json(thought);
    } else {
      res.status(404).json({
        message: 'Thought not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/**
 * DELETE Remove a Thought /thoughts/:thoughtId
 * @param string thoughtId
 * @returns a success message
 */
export const deleteThought = async (req, res) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findByIdAndDelete(thoughtId);
    if (thought) {
      res.json({
        message: 'Thought deleted successfully'
      });
    } else {
      res.status(404).json({
        message: 'Thought not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/**
 * POST Add a reaction to a Thought /thoughts/:thoughtId/reactions
 * @param string thoughtId
 * @param object reaction
 * @returns the updated Thought object
 */
export const addReaction = async (req, res) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: req.body } },
      { new: true }
    ).select('-__v'); // Exclude the __v field
    if (thought) {
      res.json(thought);
    } else {
      res.status(404).json({
        message: 'Thought not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/**
 * DELETE Remove a reaction from a Thought /thoughts/:thoughtId/reactions/:reactionId
 * @param string thoughtId
 * @param string reactionId
 * @returns the updated Thought object
 */
export const deleteReaction = async (req, res) => {
  const { thoughtId, reactionId } = req.params;
  try {
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { reactionId } } },
      { new: true }
    ).select('-__v'); // Exclude the __v field
    if (thought) {
      res.json(thought);
    } else {
      res.status(404).json({
        message: 'Thought not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};