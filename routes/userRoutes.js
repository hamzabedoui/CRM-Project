// backend/routes/users.js

const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser, updateUserStatus } = require('../controllers/userController');

// Get all users
router.get('/', getAllUsers);

// Delete a user
router.delete('/:id', deleteUser);

// Update user status
router.put('/:id/status', updateUserStatus);

module.exports = router;
