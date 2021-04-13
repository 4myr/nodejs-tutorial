
const userModel = require('../models/userModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAll = Model => async (req, res, next) => {
    try {
        const features = new APIFeatures(Model.find(), req.query).filter();
        const docs = await features.query;
        upload.single('photo');
        res.json({
            status: 'success',
            request_time: req.requestTime,
            data: docs
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            request_time: req.requestTime,
            error: err
        });
    }
}
exports.getOne = (Model, popOptions = null) => async (req, res, next) => {

    try {
        // const tour = await Tour.findById(req.params.id);
        const tour = await Tour.find().populate(popOptions).where('_id').equals(req.params.id);
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
exports.createOne = Model => async (req, res, next) => {
    try {
        const doc = await Model.create(req.body);
        upload.single('photo');
        res.json({
            status: 'success',
            request_time: req.requestTime,
            data: doc
        });
    }
    catch(err) {
        res.status(500).json({
            status: 'fail',
            request_time: req.requestTime,
            error: err
        });
    }
}
exports.updateOne = Model => async (req, res, next) => {
    try {
        let data = req.body;
        if (Model == userModel) data.photo = req.file.filename;
        const doc = await Model.findByIdAndUpdate(req.params.id, data, {
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
exports.deleteOne = Model => async (req, res, next) => {
    const doc = Model.findByIdAndDelete(req.params.id);

    if (!doc) {
        res.status(500).json({
            status: 'fails',
            data: "Document not found!"
        });
    }
    res.status(204).json({
        status: 'success',
        data: null
    });
}