// journalRoutes
const express = require('express');
const parser = require('../middleware/upload.js');
const requireAuth = require('../middleware/requireAuth.js');

const {
  getJournals,
  getJournalById,
  createJournal,
  deleteJournal,
  getJournalsForOwner,
  getStandardJournals
} = require('../controllers/journal.js');


const router = express.Router();
router.use(requireAuth);

router.get('/', getJournals);
router.get('/standard', getStandardJournals)
router.get('/profile', getJournalsForOwner);
router.get('/:id', getJournalById);
router.post('/', parser.single("pdf"), createJournal);
router.delete('/:id', deleteJournal);

export default router;