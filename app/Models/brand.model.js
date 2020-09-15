const mongoose = require('mongoose');

const BrandSchema = mongoose.Schema({
    brand_name: { type: String, required: true },
    status: { type: String },
    brand_image: { type: String },
    sort_index: { type: Number },
}, {
    timestamps: true
});

BrandSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Brands', BrandSchema);