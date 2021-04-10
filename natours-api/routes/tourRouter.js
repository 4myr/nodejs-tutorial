const express = require('express');
const { getAllTours, getTour, createTour, updateTour, deleteTour} = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRouter');

const tourRouter = express.Router();
tourRouter.route('/').get(getAllTours).post(authController.protect, authController.restrictTo('admin'), createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
tourRouter.use('/:tourId/reviews', reviewRouter);

module.exports = tourRouter;