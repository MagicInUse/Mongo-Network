import { Router } from 'express';
import { User } from '../../models/index.js';

const apiRouter = Router();

// GET /api/test
apiRouter.get('/test', (_req, res) => {
  res.send('API is working!');
});

// GET /api/magic
apiRouter.get('/magic', async (_req, res) => {
  try {
    console.log('Connecting to database...');
    const user = await User.findById('6759e04fec3be75f60ee9c90').select('name');
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