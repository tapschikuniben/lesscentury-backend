const Role = require('../Models/role.model.js');

//Create new Role
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "Role content can not be empty"
        });
    }

    // Create a Role
    const role = new Role({
        role_name: req.body.role_name,
        status: req.body.status,
    });

    // Save Role in the database
    role.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the role."
            });
        });
};

// Retrieve all roles from the database.
exports.findAll = (req, res) => {
    Role.find()
        .then(roles => {
            res.send(roles);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving roles."
            });
        });
};

// Find a single role with a roleId
exports.findOne = (req, res) => {
    Role.findById(req.params.roleId)
        .then(role => {
            if (!role) {
                return res.status(404).send({
                    message: "Role not found with id " + req.params.roleId
                });
            }
            res.send(role);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Role not found with id " + req.params.roleId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving role with id " + req.params.roleId
            });
        });
};

// Update a role
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Role content can not be empty"
        });
    }

    // Find and update role with the request body
    Role.findByIdAndUpdate(req.params.roleId, {
        role_name: req.body.role_name,
        status: req.body.status,
    }, { new: true })
        .then(role => {
            if (!role) {
                return res.status(404).send({
                    message: "Role not found with id " + req.params.roleId
                });
            }
            res.send(role);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Role not found with id " + req.params.roleId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.roleId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Role.findByIdAndRemove(req.params.roleId)
        .then(role => {
            if (!role) {
                return res.status(404).send({
                    message: "Role not found with id " + req.params.roleId
                });
            }
            res.send({ message: "Role deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Role not found with id " + req.params.roleId
                });
            }
            return res.status(500).send({
                message: "Could not delete role with id " + req.params.roleId
            });
        });
};


