const router = require('express').Router();
const { getCurrentUser, patchCurrentUser, patchPreferences, patchInfo } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/me', auth, getCurrentUser);
router.patch('/me', auth, patchCurrentUser);
router.patch('/me/pref', auth, patchPreferences);
router.patch('/me/info', auth, patchInfo);

module.exports = router;