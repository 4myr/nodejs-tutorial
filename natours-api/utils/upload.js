const multer = require('multer');

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb("Error", false);
    }
}
module.exports = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});