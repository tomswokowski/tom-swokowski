import express from 'express';
import { getUserFromToken } from '../../controllers/userController.js';
import notesRoutes from './notes.js';

const router = express.Router();

router.get('/', getUserFromToken);
router.use('/notes', notesRoutes);

export default router;
