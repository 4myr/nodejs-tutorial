const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.verifyUser = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return await User.findById(decoded.id);
    } catch(err) {
        return false;
    }
}