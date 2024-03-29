const mongoose = require('mongoose');

const ProductFileSchema = mongoose.Schema({
    avatar: { type: Array },
    created_by: { type: String },
    modified_by: { type: String },
    product_id: { type: String },
    product_name: { type: String },
    product_amount: { type: String }
})

ProductFileSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('ProductFiles', ProductFileSchema);