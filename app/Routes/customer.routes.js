module.exports = (app) => {
    const customers = require('../Controllers/customer.controller.js');

    // Create a new Customer
    app.post('/customers', customers.create);

    // Retrieve all Customers
    app.get('/customers', customers.findAll);

    // Retrieve a single Customer with customerId
    app.get('/customers/:customerId', customers.findOne);

    // Update a Note with customerId
    app.put('/customers/:customerId', customers.update);

    // Delete a Note with customerId
    app.delete('/customers/:customerId', customers.delete);

}