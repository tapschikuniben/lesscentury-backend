const Customer = require('../Models/customer.model.js');

//Create new Customer
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "Customer content can not be empty"
        });
    }

    // Create a Customer
    const customer = new Customer({
        user_name: req.body.user_name,
        email: req.body.email,
        customer_group_id: req.body.customer_group_id,
        contact: req.body.contact,
        password: req.body.password,
        status: req.body.status,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
        country: req.body.country,
        city: req.body.city,
        mail_status: req.body.mail_status,
        delete_flag: req.body.delete_flag,
        last_login: req.body.last_login,
        newsletters: req.body.newsletters,
        created_by: req.body.created_by,
        created_date: req.body.created_date,
        modified_date: req.body.modified_date,
        modified_by: req.body.modified_by,
        ip_address: req.body.ip_address,
    });

    // Save Customer in the database
    customer.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the customer."
            });
        });
};

// Retrieve all customers from the database.
exports.findAll = (req, res) => {
    Customer.find()
        .then(customers => {
            res.send(customers);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving customers."
            });
        });
};

// Find a single customer with a customerId
exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId)
        .then(customer => {
            if (!customer) {
                return res.status(404).send({
                    message: "Customer not found with id " + req.params.customerId
                });
            }
            res.send(customer);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Customer not found with id " + req.params.customerId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving customer with id " + req.params.customerId
            });
        });
};

// Update a customer
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Customer content can not be empty"
        });
    }

    // Find and update customer with the request body
    Customer.findByIdAndUpdate(req.params.customerId, {
        user_name: req.body.user_name,
        email: req.body.email,
        customer_group_id: req.body.customer_group_id,
        contact: req.body.contact,
        password: req.body.password,
        status: req.body.status,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
        country: req.body.country,
        city: req.body.city,
        mail_status: req.body.mail_status,
        delete_flag: req.body.delete_flag,
        last_login: req.body.last_login,
        newsletters: req.body.newsletters,
        created_by: req.body.created_by,
        created_date: req.body.created_date,
        modified_date: req.body.modified_date,
        modified_by: req.body.modified_by,
        ip_address: req.body.ip_address,
    }, { new: true })
        .then(customer => {
            if (!customer) {
                return res.status(404).send({
                    message: "Customer not found with id " + req.params.customerId
                });
            }
            res.send(customer);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Customer not found with id " + req.params.customerId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.customerId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Customer.findByIdAndRemove(req.params.customerId)
        .then(customer => {
            if (!customer) {
                return res.status(404).send({
                    message: "Customer not found with id " + req.params.customerId
                });
            }
            res.send({ message: "Customer deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Customer not found with id " + req.params.customerId
                });
            }
            return res.status(500).send({
                message: "Could not delete customer with id " + req.params.customerId
            });
        });
};


