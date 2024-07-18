const multer = require('multer');
const path = require('path');

// Configure storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this path exists
  },
  filename: (req, file, cb) => {
    cb(null, `avatar-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
