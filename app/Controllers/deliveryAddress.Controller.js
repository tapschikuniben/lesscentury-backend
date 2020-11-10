const DeliveryAddress = require('../Models/deliveryAddress.model.js');

//Create new DeliveryAddress
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "DeliveryAddress content can not be empty"
        });
    }

    // Create a DeliveryAddress
    const deliveryAddress = new DeliveryAddress({
        user_id: req.body.user_id,
        billing_address: req.body.billing_address,
        addresses: req.body.addresses,
    });

    // Save DeliveryAddress in the database
    deliveryAddress.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the deliveryAddress."
            });
        });
};

// Retrieve all deliveryAddresss from the database.
exports.findAll = (req, res) => {
    DeliveryAddress.find()
        .then(deliveryAddresss => {
            res.send(deliveryAddresss);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving deliveryAddresss."
            });
        });
};

// Find a single deliveryAddress with a deliveryAddressId
exports.findOne = (req, res) => {
    DeliveryAddress.findById(req.params.deliveryAddressId)
        .then(deliveryAddress => {
            if (!deliveryAddress) {
                return res.status(404).send({
                    message: "DeliveryAddress not found with id " + req.params.deliveryAddressId
                });
            }
            res.send(deliveryAddress);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "DeliveryAddress not found with id " + req.params.deliveryAddressId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving deliveryAddress with id " + req.params.deliveryAddressId
            });
        });
};

// Update a deliveryAddress
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "DeliveryAddress content can not be empty"
        });
    }

    // Find and update deliveryAddress with the request body
    DeliveryAddress.findByIdAndUpdate(req.params.deliveryAddressId, {
        user_id: req.body.user_id,
        billing_address: req.body.billing_address,
        addresses: req.body.addresses,
    }, { new: true })
        .then(deliveryAddress => {
            if (!deliveryAddress) {
                return res.status(404).send({
                    message: "DeliveryAddress not found with id " + req.params.deliveryAddressId
                });
            }
            res.send(deliveryAddress);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "DeliveryAddress not found with id " + req.params.deliveryAddressId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.deliveryAddressId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    DeliveryAddress.findByIdAndRemove(req.params.deliveryAddressId)
        .then(deliveryAddress => {
            if (!deliveryAddress) {
                return res.status(404).send({
                    message: "DeliveryAddress not found with id " + req.params.deliveryAddressId
                });
            }
            res.send({ message: "DeliveryAddress deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "DeliveryAddress not found with id " + req.params.deliveryAddressId
                });
            }
            return res.status(500).send({
                message: "Could not delete deliveryAddress with id " + req.params.deliveryAddressId
            });
        });
};


