import { Router } from 'express';
import userRouter from './userRoutes.js';
import thoughtRouter from './thoughtRoutes.js';

//For the testing purposes below
import { User } from '../../models/index.js';

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/thoughts', thoughtRouter); 

// A couple API tests before really going off, to make sure that everything is connected properly:
// GET /api/test
// API test route
apiRouter.get('/test', (_req, res) => {
  res.send('API is working!');
});
// GET /api/magic
// Live database query test route
apiRouter.get('/magic', async (_req, res) => {
  try {
    console.log('Connecting to database...');
    const user = await User.findById('6759e7d5ec3be75f60ee9c92').select('name');
    console.log('Query result:', user);
    if (!user) {
      res.status(404).send('Student not found');
      return;
    }
    res.json({ name: user.name });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).send('Server error');
  }
});

export default apiRouter;