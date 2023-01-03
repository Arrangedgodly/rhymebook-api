const router = require('express').Router();
const { getNotes, deleteNote, patchNote } = require('../controllers/notes');
const auth = require('../middlewares/auth');

router.get('/:owner', auth, getNotes);
router.patch('/:title', auth, patchNote);
router.delete('/:title', auth, deleteNote);

module.exports = router;