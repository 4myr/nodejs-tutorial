
const APIFeatures = require('../utils/apiFeatures');
const factory = require('./handlerFactory');

const Tour = require('../models/tourModel');

exports.getAllTours = factory.getAll(Tour);
exports.getTour = factory.getOne(Tour, {
    path: 'guides',
    select: '-__v -password'   
});
exports.createTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);