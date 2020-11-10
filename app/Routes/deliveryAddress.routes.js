module.exports = (app) => {
    const deliveryAddresss = require('../Controllers/deliveryAddress.controller.js');

    // Create a new DeliveryAddress
    app.post('/deliveryAddresss', deliveryAddresss.create);

    // Retrieve all DeliveryAddresss
    app.get('/deliveryAddresss', deliveryAddresss.findAll);

    // Retrieve a single DeliveryAddress with deliveryAddressId
    app.get('/deliveryAddresss/:deliveryAddressId', deliveryAddresss.findOne);

    // Update a Note with deliveryAddressId
    app.put('/deliveryAddresss/:deliveryAddressId', deliveryAddresss.update);

    // Delete a Note with deliveryAddressId
    app.delete('/deliveryAddresss/:deliveryAddressId', deliveryAddresss.delete);

}