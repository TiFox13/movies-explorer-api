const router = require('express').Router();
const { getUser, patchUserInfo } = require('../controllers/usersControllers');

router.get('/me', getUser);

router.patch('/me',  patchUserInfo);

module.exports = router;