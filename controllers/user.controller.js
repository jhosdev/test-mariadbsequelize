const db = require('../config/db');
const User = db.users;
const bcrypt = require('bcrypt')

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req, res) => {
  // Get all users from MongoDB
  const users = await User.findAll();

  // If no users 
  if (!users?.length) {
      return res.status(400).json({ message: 'No users found' })
  }

  res.json(users)
}

module.exports = {
  getAllUsers,
}