import { Router } from 'express';

const apiRouter = Router();
// GET /api/test
// This route will return a message to indicate that the API is working.
apiRouter.get('/test', (_req, res) => {
  res.send('API is working!');
});

export default apiRouter;