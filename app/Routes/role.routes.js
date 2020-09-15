module.exports = (app) => {
    const roles = require('../Controllers/role.controller.js');

    // Create a new Role
    app.post('/roles', roles.create);

    // Retrieve all Roles
    app.get('/roles', roles.findAll);

    // Retrieve a single Role with roleId
    app.get('/roles/:roleId', roles.findOne);

    // Update a Note with roleId
    app.put('/roles/:roleId', roles.update);

    // Delete a Note with roleId
    app.delete('/roles/:roleId', roles.delete);

}