const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    sku: {
        sku_name: { type: String },
        sku_status: { type: String },
    },
    upc: { type: String },
    quantity: { type: Number },
    stock_status_id: { type: String },
    image_path: { type: String },
    manufacturer_id: { type: String, required: true },
    supplier: { type: String },
    delivery_mode: { type: String },
    price: { type: Number, required: true },
    date_available: { type: Date, required: true },
    sort_index: { type: Number },
    product_name: { type: String },
    description: { type: String },
    amount: { type: Number },
    meta_tag_title: { type: String },
    meta_tag_description: { type: String },
    meta_tag_keyword: { type: String },
    discount: { type: Number },
    subtract_stock: { type: Number },
    minimum_quantity: { type: Number },
    location: { type: String },
    delete_flag: { type: String },
    condition: { type: String },
    todays_deals: { type: Boolean },
    is_feature: { type: Boolean },
    status: { type: String },
    created_by: { type: String },
    modified_by: { type: String },
    created_date: { type: Date },
    modified_date: { type: Date },
})

ProductSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Products', ProductSchema);