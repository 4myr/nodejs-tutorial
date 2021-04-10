const Tour = require('../models/tourModel');

const router = require('express').Router();

const { overview, login } = require('../controllers/viewsController');

router.route('/overview').get(overview);
router.route('/login').get(login);

module.exports = router;