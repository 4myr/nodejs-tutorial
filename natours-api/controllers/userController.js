const User = require('../models/userModel');
const APIFeatures = require('../utils/apiFeatures');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const SendEmail = async () => {
    const transporter = nodemailer.createTransport({
        service: process.env.MAIL_SERVICE,
        host: process.env.MAIL_HOST,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });
    await transporter.sendMail({
        from: 'Asghar Agha <asgharagha@gmail.com>',
        to: 'awp.1379@gmail.com',
        subject: "Onvan",
        text: "Welcome to Natours API!"
    });
};

exports.getAllUsers = async (req, res) => {
    try {
        const features = new APIFeatures(User.find(), req.query).filter();
        const doc = await features.query;
        res.json({
            status: 'success',
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
exports.createUser = async (req, res) => {
    try {
        const doc = await User.create(req.body);
        const token = jwt.sign({
            id: doc._id
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE * 60 * 1000 
        });
        res.json({
            status: 'success',
            token: token,
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
exports.updateUser = async (req, res) => {
    try {
        const doc = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.json({
            status: 'success',
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
exports.deleteUser = async (req, res) => {
    try {
        const doc = await User.findByIdAndDelete(req.params.id);
        res.json({
            status: 'success'
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            request_time: req.requestTime,
            error: err
        });
    }
}
exports.getMe = async (req, res) => {
    await SendEmail();
    res.json({
        status: 'success',
        data: req.user
    });
}
exports.loginUser = async (req, res) => {
    if (!req.body.user || !req.body.password) {
        res.status(400).json({
            status: 'fail',
            request_time: req.requestTime,
            error: "User & Password cannot be empty!"
        });
    }
    try {
        const user = await User.findOne({ username: req.body.user });
        bcrypt.compare(req.body.password, user.password, (err, bres) => {
            if (!err && bres) {
                const token = jwt.sign({
                    id: user._id
                }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRE * 60 * 1000 
                });
                res.cookie('jwt', token, {
                    expires: new Date( Date.now() + process.env.JWT_EXPIRE * 60 * 1000 ),
                    httpOnly: true
                }).json({
                    status: 'success',
                    token: token
                });
            }
            res.status(400).json({
                status: 'fail',
                request_time: req.requestTime,
                error: "User or password wrong!"
            });
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'fail',
            request_time: req.requestTime,
            error: err
        });
    }
}