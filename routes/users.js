const router = require('express').Router();
const { getCurrentUser, patchCurrentUser, patchPreferences } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/me', auth, getCurrentUser);
router.patch('/me', auth, patchCurrentUser);
router.patch('/me/pref', auth, patchPreferences);

module.exports = router;