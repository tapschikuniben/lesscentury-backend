module.exports = (app) => {
    const brands = require('../Controllers/brand.controller.js');

    // Create a new Brand
    app.post('/brands', brands.create);

    // Retrieve all Brands
    app.get('/brands', brands.findAll);

    // Retrieve a single Brand with brandId
    app.get('/brands/:brandId', brands.findOne);

    // Update a Note with brandId
    app.put('/brands/:brandId', brands.update);

    // Delete a Note with brandId
    app.delete('/brands/:brandId', brands.delete);

}