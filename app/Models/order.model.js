const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    customer_id: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    user_name: { type: String },
    email: { type: String },
    is_delivery: { type: String },
    delivery_fee: { type: Number },
    delivery_instructions: { type: String },
    destination: {
        shipping_address: { type: String },
        location: { type: String },
    },
    shipping_company: {
        shipping_company_name: { type: String },
        shipping_company_contact: { type: String },
        shipping_company_address: { type: String },
    },
    cart_items: [],
    shipping_method: { type: String },
    payment_method: { type: String },
    stage: { type: String },
    currency_id: { type: String, required: true },
    shipping_zone_id: { type: String },
    payment_zone_id: { type: String },
    shipping_country_id: { type: String },
    payment_country_id: { type: String },
    invoice_no: { type: String },
    invoice_prefix: { type: String },
    order_prefix_id: { type: String },
    commision: { type: Number, required: true },
    sub_total: { type: Number },
    reward: { type: Number },
    total: { type: Number },
    reward: { type: Number },
    discount: { type: Number },
    rate: { type: Number },
    currency_code: { type: String },
    currency_value: { type: Number, required: true },
    credits_used: { type: Number },
    discounted_subtotal: { type: Number },
    contact: { type: String, required: true },
    created_by: { type: String },
    modified_by: { type: String },
    created_date: { type: Date },
    modified_date: { type: Date },
    status: { type: String },
    promo_code: { type: String },
    shop_contact: { type: String },
    shop_email: { type: String },
    shop_address: { type: String },
    comment: { type: String },
    affiliate_id: { type: String },
    ip: { type: String, required: true },
    order_number: { type: String },
}, {
    timestamps: true
});

OrderSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Orders', OrderSchema);