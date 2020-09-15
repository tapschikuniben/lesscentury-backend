const CustomerGroup = require('../Models/customerGroup.model.js');

//Create new CustomerGroup
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "CustomerGroup content can not be empty"
        });
    }

    // Create a CustomerGroup
    const customerGroup = new CustomerGroup({
        customerGroup_name: req.body.customerGroup_name,
        status: req.body.status,
        created_by: req.body.created_by,
        created_date: req.body.created_date,
        modified_date: req.body.modified_date,
        modified_by: req.body.modified_by,
    });

    // Save CustomerGroup in the database
    customerGroup.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the customerGroup."
            });
        });
};

// Retrieve all customerGroups from the database.
exports.findAll = (req, res) => {
    CustomerGroup.find()
        .then(customerGroups => {
            res.send(customerGroups);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving customerGroups."
            });
        });
};

// Find a single customerGroup with a customerGroupId
exports.findOne = (req, res) => {
    CustomerGroup.findById(req.params.customerGroupId)
        .then(customerGroup => {
            if (!customerGroup) {
                return res.status(404).send({
                    message: "CustomerGroup not found with id " + req.params.customerGroupId
                });
            }
            res.send(customerGroup);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "CustomerGroup not found with id " + req.params.customerGroupId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving customerGroup with id " + req.params.customerGroupId
            });
        });
};

// Update a customerGroup
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "CustomerGroup content can not be empty"
        });
    }

    // Find and update customerGroup with the request body
    CustomerGroup.findByIdAndUpdate(req.params.customerGroupId, {
        customerGroup_name: req.body.customerGroup_name,
        status: req.body.status,
        created_by: req.body.created_by,
        created_date: req.body.created_date,
        modified_date: req.body.modified_date,
        modified_by: req.body.modified_by,
    }, { new: true })
        .then(customerGroup => {
            if (!customerGroup) {
                return res.status(404).send({
                    message: "CustomerGroup not found with id " + req.params.customerGroupId
                });
            }
            res.send(customerGroup);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "CustomerGroup not found with id " + req.params.customerGroupId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.customerGroupId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    CustomerGroup.findByIdAndRemove(req.params.customerGroupId)
        .then(customerGroup => {
            if (!customerGroup) {
                return res.status(404).send({
                    message: "CustomerGroup not found with id " + req.params.customerGroupId
                });
            }
            res.send({ message: "CustomerGroup deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "CustomerGroup not found with id " + req.params.customerGroupId
                });
            }
            return res.status(500).send({
                message: "Could not delete customerGroup with id " + req.params.customerGroupId
            });
        });
};


