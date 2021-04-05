
const APIFeatures = require('../utils/apiFeatures');

const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
    try {
        const features = new APIFeatures(Tour.find(), req.query).filter();
        const docs = await features.query;
        
        res.json({
            status: 'success',
            request_time: req.requestTime,
            data: docs
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'fail',
            request_time: req.requestTime,
            error: err
        });
    }
}
exports.getTour = async (req, res) => {
    try {
        // const tour = await Tour.findById(req.params.id);
        const tour = await Tour.find().where('_id').equals(req.params.id);
        res.json({
            status: 'success',
            request_time: req.requestTime,
            data: tour
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            request_time: req.requestTime,
            error: err
        });
    }
}
exports.createTour = async (req, res) => {
    try {
        const doc = await Tour.create(req.body);
        res.json({
            status: 'success',
            request_time: req.requestTime,
            data: doc
        });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            status: 'fail',
            request_time: req.requestTime,
            error: err
        });
    }
}
exports.updateTour = async (req, res) => {
    try {
        const doc = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidator: true
        });
        res.json({
            status: 'success',
            request_time: req.requestTime,
            data: doc
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            request_time: req.requestTime,
            error: err
        });
    }
}
exports.deleteTour = async (req, res) => {
    try {
        const doc = await Tour.findByIdAndDelete(req.params.id);
        res.json({
            status: 'success',
            request_time: req.requestTime
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            request_time: req.requestTime,
            error: err
        });
    }
}