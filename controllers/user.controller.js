const db = require('../config/db');
const User = db.users;
const bcrypt = require('bcrypt')

// Create and Save a new User
exports.create = (req, res) => {
    const { idUser, email, password, idRol, idEmpresa } = req.body;

    // Validate request
    console.log(req.body)
    if (!usu_cuenta || !usu_nombre || !usu_clave) {
      res.status(400).send({
        message: "Introduzca todos los campos!"
      });
      return;
    }

    // Create a User
    const user = {
      ...req.body,
    };
  
    // Save User in the database
    User.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });
  };
  
  // Retrieve all Users from the database
  exports.findAll = (req, res) => {
    User.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
  };
  
  // Update a User by the id in the request
  exports.update = (req, res) => {
    const id = req.body.id;
  
    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  };
  
  // Delete a User with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.query.id;
  
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  };
  