const mongoose = require('mongoose');
const slugify = require('slugify');
const titleCase = require('../utils/titleCase');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name cannot be empty!']
    },
    duration: Number,
    difficuly: {
        type: String,
        default: "medium"
    },
    price: {
        type: Number,
        required: [true, "Price cannot be empty!"]
    },
    description: String,
    summary: String,
    maxGroupSize: Number,
    ratingsAverage: Number,
    ratingsQuantity: Number,
    images: [
        {
            type: String
        }
    ],
    startLocation: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: [Number, Number],
        address: String
    },
    locations: [
        {
            coordinates: [Number, Number],
            description: String
        }
    ],
    guides: [
        {
            // type: String,
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ]
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

// Embeding
// tourSchema.pre('save', async function(next) {
//     console.log('ttt');
//     const guidesParam = this.guides.map(async id => await User.findById(id));
//     this.guides = await Promise.all(guidesParam);
// });
tourSchema.virtual('slug').get( function(){
    return slugify("" + this.name, {
        lower: true
    });
});
tourSchema.pre("save", function(next) {
    this.name = titleCase(this.name);
    next();
})
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;