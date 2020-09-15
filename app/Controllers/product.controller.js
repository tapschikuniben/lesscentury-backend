const Product = require('../Models/product.model.js');

//Create new Product
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Create a Product
    const product = new Product({
        sku: req.body.sku,
        upc: req.body.upc,
        quantity: req.body.quantity,
        stock_status_id: req.body.stock_status_id,
        image_path: req.body.image_path,
        manufacturer_id: req.body.manufacturer_id,
        shipping: req.body.shipping,
        price: req.body.price,
        date_available: req.body.date_available,
        sort_index: req.body.sort_index,
        product_name: req.body.product_name,
        description: req.body.description,
        amount: req.body.amount,
        meta_tag_title: req.body.meta_tag_title,
        meta_tag_description: req.body.meta_tag_description,
        meta_tag_keyword: req.body.meta_tag_keyword,
        discount: req.body.discount,
        subtract_stock: req.body.subtract_stock,
        minimum_quantity: req.body.minimum_quantity,
        location: req.body.location,
        delete_flag: req.body.delete_flag,
        condition: req.body.condition,
        todays_deals: req.body.todays_deals,
        status: req.body.status,
        created_by: req.body.created_by,
        modified_by: req.body.modified_by,
        created_date: req.body.created_date,
        modified_date: req.body.modified_date,
    });

    // Save Product in the database
    product.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the product."
            });
        });
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
    Product.find()
        .then(products => {
            res.send(products);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving products."
            });
        });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    Product.findById(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            res.send(product);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving product with id " + req.params.productId
            });
        });
};

// Update a product
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Find and update product with the request body
    Product.findByIdAndUpdate(req.params.productId, {
        sku: req.body.sku,
        upc: req.body.upc,
        quantity: req.body.quantity,
        stock_status_id: req.body.stock_status_id,
        image_path: req.body.image_path,
        manufacturer_id: req.body.manufacturer_id,
        shipping: req.body.shipping,
        price: req.body.price,
        date_available: req.body.date_available,
        sort_index: req.body.sort_index,
        product_name: req.body.product_name,
        description: req.body.description,
        amount: req.body.amount,
        meta_tag_title: req.body.meta_tag_title,
        meta_tag_description: req.body.meta_tag_description,
        meta_tag_keyword: req.body.meta_tag_keyword,
        discount: req.body.discount,
        subtract_stock: req.body.subtract_stock,
        minimum_quantity: req.body.minimum_quantity,
        location: req.body.location,
        delete_flag: req.body.delete_flag,
        condition: req.body.condition,
        todays_deals: req.body.todays_deals,
        status: req.body.status,
        created_by: req.body.created_by,
        modified_by: req.body.modified_by,
        created_date: req.body.created_date,
        modified_date: req.body.modified_date,
    }, { new: true })
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            res.send(product);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.productId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            res.send({ message: "Product deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Could not delete product with id " + req.params.productId
            });
        });
};


