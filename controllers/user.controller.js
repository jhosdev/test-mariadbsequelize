const db = require('../config/db');
const User = db.user;
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

const createUser = async (req, res) => {

  try {
    const { usu_cuenta, usu_clave, fk_idRol, fk_idEmpresa } = req.body

    if (!usu_cuenta || !usu_clave || !fk_idRol || !fk_idEmpresa) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const user = new User({
      usu_cuenta,
      usu_clave,
      fk_idRol,
      fk_idEmpresa
    })


  } catch (error) {
    res.status(400).json({ error: error })
  }

}

module.exports = {
  getAllUsers,
}