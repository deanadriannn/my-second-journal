// journalRoutes
import express from 'express';
import parser from '../middleware/upload.js';
import requireAuth from '../middleware/requireAuth.js'

import { getJournals, getJournalById, createJournal, deleteJournal, getJournalsForOwner, getStandardJournals } from '../controllers/journal.js';

const router = express.Router();
router.use(requireAuth);

router.get('/', getJournals);
router.get('/standard', getStandardJournals)
router.get('/profile', getJournalsForOwner);
router.get('/:id', getJournalById);
router.post('/', parser.single("pdf"), createJournal);
router.delete('/:id', deleteJournal);

export default router;