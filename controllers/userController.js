// backend/controllers/userController.js

const User = require('../models/user');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'client' }, 'name email workingAddress phoneNumber status');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Update user status
const updateUserStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    user.status = status;
    await user.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  updateUserStatus,
};
