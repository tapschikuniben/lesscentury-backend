const Brand = require('../Models/brand.model.js');

//Create new Brand
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "Brand content can not be empty"
        });
    }

    // Create a Brand
    const brand = new Brand({
        brand_name: req.body.brand_name,
        status: req.body.status,
    });

    // Save Brand in the database
    brand.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the brand."
            });
        });
};

// Retrieve all brands from the database.
exports.findAll = (req, res) => {
    Brand.find()
        .then(brands => {
            res.send(brands);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving brands."
            });
        });
};

// Find a single brand with a brandId
exports.findOne = (req, res) => {
    Brand.findById(req.params.brandId)
        .then(brand => {
            if (!brand) {
                return res.status(404).send({
                    message: "Brand not found with id " + req.params.brandId
                });
            }
            res.send(brand);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Brand not found with id " + req.params.brandId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving brand with id " + req.params.brandId
            });
        });
};

// Update a brand
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Brand content can not be empty"
        });
    }

    // Find and update brand with the request body
    Brand.findByIdAndUpdate(req.params.brandId, {
        brand_name: req.body.brand_name,
        status: req.body.status,
    }, { new: true })
        .then(brand => {
            if (!brand) {
                return res.status(404).send({
                    message: "Brand not found with id " + req.params.brandId
                });
            }
            res.send(brand);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Brand not found with id " + req.params.brandId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.brandId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Brand.findByIdAndRemove(req.params.brandId)
        .then(brand => {
            if (!brand) {
                return res.status(404).send({
                    message: "Brand not found with id " + req.params.brandId
                });
            }
            res.send({ message: "Brand deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Brand not found with id " + req.params.brandId
                });
            }
            return res.status(500).send({
                message: "Could not delete brand with id " + req.params.brandId
            });
        });
};


