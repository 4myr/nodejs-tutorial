const User = require('../models/userModel');
const APIFeatures = require('../utils/apiFeatures');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const factory = require('./handlerFactory');
const upload = require('../utils/upload');
const sharp = require('sharp');
const Email = require('../utils/email');

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
exports.uploadUserPhoto = upload.single('photo');
exports.resizeUserPhoto = async (req, res, next) => {
    if (!req.file) return next();
    req.file.filename = `user-${req.params.id}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer).toFormat('jpeg').
    jpeg().toFile(`public/img/users/${req.file.filename}`);
    next();
}
exports.getAllUsers = factory.getAll(User);
exports.createUser = async (req, res) => {
    try {
        let data = req.body;
        // data.photo = req.file.filename;
        const doc = await User.create(data);
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
        console.log(err);
        res.status(500).json({
            status: 'fail',
            request_time: req.requestTime,
            error: err
        });
    }
}
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

exports.getMe = async (req, res) => {
    await (new Email(req.user, "https://google.com")).sendWelcome();
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
            } else {
                res.status(400).json({
                    status: 'fail',
                    request_time: req.requestTime,
                    error: "User or password wrong!"
                });
            }
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