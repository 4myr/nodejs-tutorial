const express = require('express');
const morgan = require('morgan');
const path = require('path');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Routers
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');
const reviewRouter = require('./routes/reviewRouter');
const viewsRouter = require('./routes/viewsRouter');

// Models
const User = require('./models/userModel');
const upload = require('./utils/upload');

const app = express();

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "You used your maximum request."
});

// General Middlewares
app.use('/api', limiter);
app.use(helmet({
    limit: "1kb"
}));
app.use(xss());
app.use(mongoSanitize());
app.use(hpp());

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, "views"));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
// app.use(upload.array());
app.use(cookieParser());
app.options('*', cors());

// RequestTime Middleware
app.use( (req, res, next) => {
    req.requestTime = new Date();
    next();
});

// Get user
app.use( async (req, res, next) => {
    
    let token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : undefined;
    token = token == undefined ? req.cookies.jwt : token
    req.user = undefined;
    if (token) {
        await jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (!err) {
                req.user = await User.findById(decoded.id).select('-__v -password');
            }
        });
    }

    next();
});


// Using Routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/', viewsRouter);

// Not found pages
app.all('*', (req, res, next) => {
    res.status(404).send('Page Not Found');
});

// Global Error Handler
app.use( (err, req, res, next) => {
    console.log(err);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    res.status(err.statusCode).json({
        status: err.status
    })
})

module.exports = app;