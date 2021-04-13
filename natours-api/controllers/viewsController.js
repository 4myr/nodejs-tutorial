const Tour = require("../models/tourModel");
const { verifyUser } = require("../utils/auth");

exports.needLogin = async (req, res, next) => {
    if (req.cookies.jwt && await verifyUser(req.cookies.jwt)) {
        next();
    }
    res.redirect('/login');
}
exports.overview = async (req, res) => {
    res.render('overview', {
        title: "All Tours",
        tours: await Tour.find(),
        user: req.user
    });
}
exports.login = async (req, res) => {
    if (req.cookies.jwt && await verifyUser(req.cookies.jwt)) {
        res.redirect('/');
    } else {
        res.clearCookie('jwt').render('login', {
            title: "Login",
        });
    }
}
exports.account = (req, res) => {
    res.render('account', {
        title: 'Account Info',
        user: req.user
    });
}