const mongoose = require('mongoose');

const BannerSchema = mongoose.Schema({
    banner_name: { type: String },
    title: { type: String },
    product_name: { type: String },
    product_amount_from: { type: String },
    product_description: { type: String },
    avatar: { type: String },
    status: { type: String },
})

BannerSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Banners', BannerSchema);
