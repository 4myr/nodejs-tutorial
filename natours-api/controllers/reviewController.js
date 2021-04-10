
const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');

exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({tour: req.params.tourId});

        res.json({
            status: 'success',
            request_time: req.requestTime,
            data: reviews
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            request_time: req.requestTime,
            error: err
        });
    }
}
exports.createReview = factory.createOne(Review);