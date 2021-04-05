const express = require('express');
const authController = require('../controllers/authController');

const {getMe, getAllUsers, createUser, deleteUser, updateUser, loginUser} = require('../controllers/userController');

const userRouter = express.Router();
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/me').get(authController.protect, getMe);
userRouter.route('/:id').delete(deleteUser).patch(updateUser);

module.exports = userRouter;