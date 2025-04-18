import express from 'express';
import userRoutes from './user/index.js';

const router = express.Router();

router.use('/user', userRoutes);

export default router;
