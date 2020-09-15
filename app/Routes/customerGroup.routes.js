module.exports = (app) => {
    const customerGroups = require('../Controllers/customerGroup.controller.js');

    // Create a new CustomerGroup
    app.post('/customerGroups', customerGroups.create);

    // Retrieve all CustomerGroups
    app.get('/customerGroups', customerGroups.findAll);

    // Retrieve a single CustomerGroup with customerGroupId
    app.get('/customerGroups/:customerGroupId', customerGroups.findOne);

    // Update a Note with customerGroupId
    app.put('/customerGroups/:customerGroupId', customerGroups.update);

    // Delete a Note with customerGroupId
    app.delete('/customerGroups/:customerGroupId', customerGroups.delete);

}