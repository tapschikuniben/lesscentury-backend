const mongoose = require('mongoose');

const DeliveryAddressSchema = mongoose.Schema({
    user_id: { type: String },
    billing_address: {
        physical_address_line_one: { type: String, required: true },
        physical_address_line_two: { type: String },
        country: { type: String, required: true },
        zip_code: { type: String, required: true },
        contact: { type: Number, required: true },
    },
    addresses: { type: Array }
}, {
    timestamps: true
});

DeliveryAddressSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('DeliveryAddresss', DeliveryAddressSchema);