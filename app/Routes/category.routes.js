module.exports = (app) => {
    const categorys = require('../Controllers/category.controller.js');

    // Create a new Category
    app.post('/categorys', categorys.create);

    // Retrieve all Categorys
    app.get('/categorys', categorys.findAll);

    // Retrieve a single Category with categoryId
    app.get('/categorys/:categoryId', categorys.findOne);

    // Update a Note with categoryId
    app.put('/categorys/:categoryId', categorys.update);

    // Delete a Note with categoryId
    app.delete('/categorys/:categoryId', categorys.delete);

}