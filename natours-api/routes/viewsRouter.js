const router = require('express').Router();

const { overview, login, account, needLogin } = require('../controllers/viewsController');
const { loginUser } = require('../controllers/userController');

router.route('/').get(overview);
router.route('/login').get(login).post(loginUser);
router.route('/account').get(needLogin, account);

module.exports = router;