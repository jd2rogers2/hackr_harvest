const multer  = require('multer');


const fileUpload = multer({
    dest: 'uploads/',
    limits: {
      fileSize: 5 * 1024 * 1024, // limit file size to 5MB
    },
});

module.exports = {
    fileUpload,
};
