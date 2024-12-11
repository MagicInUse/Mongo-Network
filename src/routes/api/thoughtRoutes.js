import { Router } from 'express';
import {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
} from '../../controllers/thoughtController.js';

const thoughtRouter = Router();

// /api/thoughts
thoughtRouter.route('/')
  .get(getAllThoughts)
  .post(createThought);

// /api/thoughts/:thoughtId
thoughtRouter.route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
thoughtRouter.route('/:thoughtId/reactions')
  .post(addReaction)
  .delete(deleteReaction);

export default thoughtRouter;