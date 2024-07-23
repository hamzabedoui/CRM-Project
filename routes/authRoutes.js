const express = require("express");
const {
  editProfile,
  registerAdmin,
  login,
  getUserDetails,
  signOut,
  createClient,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/mutler"); // Import multer middleware
  
const router = express.Router();

router.post("/register/admin", registerAdmin);
router.post("/login", login);
router.get("/userinfo", protect, getUserDetails);   
router.post("/signOut", protect, signOut); 
router.post("/createClient", createClient);
router.put("/edit-profile", protect, upload.single('avatar'), editProfile);

module.exports = router;
