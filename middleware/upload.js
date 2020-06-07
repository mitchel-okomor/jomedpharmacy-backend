const multer = require('multer');


// define storage area and image file name
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
  })
   
  module.exports = multer({ storage: storage })