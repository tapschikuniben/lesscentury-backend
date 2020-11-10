const Subscription = require('../Models/subscription.model.js');

//Create new Subscription
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "Subscription content can not be empty"
        });
    }

    // Create a Subscription
    const subscription = new Subscription({
        email: req.body.email,
        timestamp: req.body.timestamp,
    });

    // Save Subscription in the database
    subscription.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the subscription."
            });
        });
};

// Retrieve all subscriptions from the database.
exports.findAll = (req, res) => {
    Subscription.find()
        .then(subscriptions => {
            res.send(subscriptions);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving subscriptions."
            });
        });
};

// Find a single subscription with a subscriptionId
exports.findOne = (req, res) => {
    Subscription.findById(req.params.subscriptionId)
        .then(subscription => {
            if (!subscription) {
                return res.status(404).send({
                    message: "Subscription not found with id " + req.params.subscriptionId
                });
            }
            res.send(subscription);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Subscription not found with id " + req.params.subscriptionId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving subscription with id " + req.params.subscriptionId
            });
        });
};

// Update a subscription
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Subscription content can not be empty"
        });
    }

    // Find and update subscription with the request body
    Subscription.findByIdAndUpdate(req.params.subscriptionId, {
        email: req.body.email,
        timestamp: req.body.timestamp,
    }, { new: true })
        .then(subscription => {
            if (!subscription) {
                return res.status(404).send({
                    message: "Subscription not found with id " + req.params.subscriptionId
                });
            }
            res.send(subscription);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Subscription not found with id " + req.params.subscriptionId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.subscriptionId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Subscription.findByIdAndRemove(req.params.subscriptionId)
        .then(subscription => {
            if (!subscription) {
                return res.status(404).send({
                    message: "Subscription not found with id " + req.params.subscriptionId
                });
            }
            res.send({ message: "Subscription deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Subscription not found with id " + req.params.subscriptionId
                });
            }
            return res.status(500).send({
                message: "Could not delete subscription with id " + req.params.subscriptionId
            });
        });
};


