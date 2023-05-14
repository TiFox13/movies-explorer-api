const router = require('express').Router();
const { getUser, patchUserInfo } = require('../controllers/usersControllers');
const { userValidation } = require('../middlewares/validation');

router.get('/me', getUser);

router.patch('/me', userValidation, patchUserInfo);

module.exports = router;
