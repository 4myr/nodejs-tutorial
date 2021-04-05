exports.protect = (req, res, next) => {
    if (!req.user) {
        res.json({
            status: 'fail',
            error: 'Unauthorized!'
        });
    }
    next();
}
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.json({
                status: 'fail',
                error: "You have not enough permission!"
            })
        }
        next();
    }
}