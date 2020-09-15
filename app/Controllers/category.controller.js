const Category = require('../Models/category.model.js');

//Create new Category
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "Category content can not be empty"
        });
    }

    // Create a Category
    const category = new Category({
        category_name: req.body.category_name,
        meta_tag_title: req.body.meta_tag_title,
        meta_tag_description: req.body.meta_tag_description,
        meta_tag_keyword: req.body.meta_tag_keyword,
        parent_category: req.body.parent_category,
        status: req.body.status,
        sort_index: req.body.sort_index,
        created_by: req.body.created_by,
        modified_by: req.body.modified_by,
        created_date: req.body.created_date,
        modified_date: req.body.modified_date,
    });

    // Save Category in the database
    category.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the category."
            });
        });
};

// Retrieve all categorys from the database.
exports.findAll = (req, res) => {
    Category.find()
        .then(categorys => {
            res.send(categorys);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving categorys."
            });
        });
};

// Find a single category with a categoryId
exports.findOne = (req, res) => {
    Category.findById(req.params.categoryId)
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.categoryId
                });
            }
            res.send(category);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.categoryId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving category with id " + req.params.categoryId
            });
        });
};

// Update a category
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Category content can not be empty"
        });
    }

    // Find and update category with the request body
    Category.findByIdAndUpdate(req.params.categoryId, {
        category_name: req.body.category_name,
        meta_tag_title: req.body.meta_tag_title,
        meta_tag_description: req.body.meta_tag_description,
        meta_tag_keyword: req.body.meta_tag_keyword,
        parent_category: req.body.parent_category,
        status: req.body.status,
        sort_index: req.body.sort_index,
        created_by: req.body.created_by,
        modified_by: req.body.modified_by,
        created_date: req.body.created_date,
        modified_date: req.body.modified_date,
    }, { new: true })
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.categoryId
                });
            }
            res.send(category);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.categoryId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.categoryId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Category.findByIdAndRemove(req.params.categoryId)
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.categoryId
                });
            }
            res.send({ message: "Category deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.categoryId
                });
            }
            return res.status(500).send({
                message: "Could not delete category with id " + req.params.categoryId
            });
        });
};


