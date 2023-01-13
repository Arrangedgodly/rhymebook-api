const router = require('express').Router();
const { getNotes, createNote, getNote, deleteNote, patchNote } = require('../controllers/notes');
const auth = require('../middlewares/auth');

router.get('/', auth, getNotes);
router.post('/', auth, createNote);
router.get('/:_id', auth, getNote);
router.patch('/:_id', auth, patchNote);
router.delete('/:_id', auth, deleteNote);

module.exports = router;