const User = require("../models/user");
const fs = require('fs');
const path = require('path');

const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const newAdmin = await User.create({
      name,
      email,
      password,
      role: "responsable",
    });

    await newAdmin.save();
    const token = newAdmin.generateToken();
    res.status(201).json({ msg: "Admin registered successfully", token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// User Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const token = user.generateToken();
    res.cookie("token", token, {
      maxAge: 360000 * 1000,
    });
    res.status(200).json({ msg: "Login successful", token, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get User Details
const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Sign Out
const signOut = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Signed out successfully" });
};

// Create Client
const createClient = async (req, res) => {
  const { name, email, password, workingAddress, phoneNumber } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      role: "client",
      workingAddress,
      phoneNumber,
    });

    await newUser.save();

    res.status(201).json({ msg: "Client created successfully", user: newUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Edit Profile
const editProfile = async (req, res) => {
  const { name, email } = req.body;
  const avatarFile = req.file ? req.file.filename : null;

  try {
    // Find the user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;

    // Handle avatar update
    if (avatarFile) {
      // Save the new avatar path to the user's profile
      user.avatar = avatarFile;

      // Ensure previous avatar is deleted
      if (user.avatar && user.avatar !== 'default-avatar.jpg') {
        const previousAvatarPath = path.join(__dirname, '../uploads', user.avatar);
        if (fs.existsSync(previousAvatarPath)) {
          fs.unlinkSync(previousAvatarPath); // Delete old avatar file
        }
      }
    }

    await user.save();
    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getUserDetails,
  login,
  registerAdmin,
  signOut,
  createClient,
  editProfile,
};
