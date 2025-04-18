import express from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../../controllers/noteController.js';
import { ensureAuthenticated } from '../../middleware/ensureAuth.js';

const router = express.Router();

router.use(ensureAuthenticated);

router.get('/', getAllNotes);
router.post('/new', createNote);
router.get('/:id', getNoteById);
router.put('/edit/:id', updateNote);
router.delete('/delete/:id', deleteNote);

export default router;
