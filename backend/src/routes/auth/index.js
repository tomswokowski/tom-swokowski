import express from 'express';
import {
  redirectToGitHub,
  handleGitHubCallback,
  logout,
} from '../../controllers/authController.js';

const router = express.Router();

router.get('/github', redirectToGitHub);
router.get('/github/callback', handleGitHubCallback);
router.post('/logout', logout);

export default router;
