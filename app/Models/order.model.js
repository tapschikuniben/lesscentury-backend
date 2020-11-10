const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    customer_id: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    user_name: { type: String },
    email: { type: String },
    customer_contact: { type: String, required: true },
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
    shipping_method: { type: String },
    cart_items: { type: Array },
    payment_methods: { type: Array },
    stage: { type: String },
    currency_code: { type: String, required: true },
    shipping_zone_id: { type: String },
    payment_zone_id: { type: String },
    shipping_country_id: { type: String },
    payment_country_id: { type: String },
    invoice_no: { type: String },
    invoice_prefix: { type: String },
    order_prefix_id: { type: String },
    commision: { type: Number },
    sub_total: { type: Number },
    reward: { type: Number },
    total: { type: Number },
    discount: { type: Number },
    rate: {
        usl: { type: Number },
        zwl: { type: Number },
    },
    credits_used: { type: Number },
    discounted_subtotal: { type: Number },
    created_by: { type: String },
    modified_by: { type: String },
    created_date: { type: Date },
    modified_date: { type: Date },
    status: { type: String },
    promo_code: { type: String },
    shop_contact: { type: Number },
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