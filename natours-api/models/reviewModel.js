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
    tour:{
        type: mongoose.Schema.ObjectId,
        ref: "Tour"
    }
});

const review = mongoose.model('Review', reviewSchema);

module.exports = review;