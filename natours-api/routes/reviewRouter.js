const express = require('express'); 
const { getReviews, createReview, getTourReviews } = require('../controllers/reviewController');
const reviewRouter = express.Router({
    mergeParams: true   
});

reviewRouter.route('/').get(getReviews).post(createReview);

module.exports = reviewRouter;