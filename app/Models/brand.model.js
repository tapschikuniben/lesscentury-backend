const mongoose = require('mongoose');

const BrandSchema = mongoose.Schema({
    brand_name: { type: String },
    avatar: { type: String },
    status: { type: String },
})

BrandSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Brands', BrandSchema);
