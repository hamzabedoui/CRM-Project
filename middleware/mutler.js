const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + '-' + file.originalname
    ); // Set a unique filename for each file
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
