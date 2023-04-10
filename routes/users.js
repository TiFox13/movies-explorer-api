const router = require('express').Router();
const { getUser, patchUserInfo } = require('../controllers/usersControllers');
const auth = require('../middlewares/auth');


router.get('/me', auth, getUser);

router.patch('/me', auth,  patchUserInfo);

module.exports = router;