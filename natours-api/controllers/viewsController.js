const Tour = require("../models/tourModel");

exports.overview = async (req, res) => {
    res.render('overview', {
        title: "All Tours",
        tours: await Tour.find()
    });
}
exports.login = async (req, res) => {
    res.render('login');
}