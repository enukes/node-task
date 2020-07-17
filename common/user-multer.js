const multer = require('multer');
const uniqid = require('uniqid');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'static/uploads/');
  },
  filename: (req, file, callback) => {
    let ext = '';
    if (file.mimetype === 'application/pdf') ext = '.pdf';
    else ext = path.extname(file.originalname);
    callback(null, uniqid() + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }
});

module.exports = upload;
