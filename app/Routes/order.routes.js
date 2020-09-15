module.exports = (app) => {
    const orders = require('../Controllers/order.controller.js');

    // Create a new Order
    app.post('/orders', orders.create);

    // Retrieve all Orders
    app.get('/orders', orders.findAll);

    // Retrieve a single Order with orderId
    app.get('/orders/:orderId', orders.findOne);

    // Update a Note with orderId
    app.put('/orders/:orderId', orders.update);

    // Delete a Note with orderId
    app.delete('/orders/:orderId', orders.delete);

}