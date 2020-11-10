module.exports = (app) => {
    const subscriptions = require('../Controllers/subscription.controller.js');

    // Create a new Subscription
    app.post('/subscriptions', subscriptions.create);

    // Retrieve all Subscriptions
    app.get('/subscriptions', subscriptions.findAll);

    // Retrieve a single Subscription with subscriptionId
    app.get('/subscriptions/:subscriptionId', subscriptions.findOne);

    // Update a Note with subscriptionId
    app.put('/subscriptions/:subscriptionId', subscriptions.update);

    // Delete a Note with subscriptionId
    app.delete('/subscriptions/:subscriptionId', subscriptions.delete);

}