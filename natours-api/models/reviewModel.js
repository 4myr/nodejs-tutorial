const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    rate: {
        type: Number,
        min: 0,
        max: 5,
        required: ["Rate is required!"]
    },
    comment: {
        type: String,
        required: ["Comment is required!"]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: ["User is required!"]
    },
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: "Tour",
        required: ["User is required!"]
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

const review = mongoose.model('Review', reviewSchema);

module.exports = review;