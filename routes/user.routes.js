module.exports = app => {
    const users = require("../controllers/user.controller.js");

    var router = require("express").Router();

    // Create a new User
    router.post("/", users.create);

    // Retrieve all Users
    router.get("/", users.findAll);


    // Update a User with id
    router.put("/", users.update);

    // Delete a User with id
    router.delete("/", users.delete);

    app.use('/api/users', router);
};