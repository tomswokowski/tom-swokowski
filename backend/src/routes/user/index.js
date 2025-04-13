import express from 'express';
import { getUserFromToken } from '../../controllers/userController.js';

const router = express.Router();

router.get('/', getUserFromToken);

export default router;
