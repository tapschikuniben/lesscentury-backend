const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    user_name: { type: String, required: true },
    email: { type: String, required: true },
    customer_group_id: { type: String },
    contact: { type: String, required: true },
    password: { type: String },
    status: { type: String },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    mail_status: { type: String },
    delete_flag: { type: String },
    last_login: { type: Date },
    newsletters: { type: String },
    created_by: { type: String },
    created_date: { type: Date },
    modified_date: { type: Date },
    modified_by: { type: String },
    ip_address: { type: String },
    role: { type: String },
}, {
    timestamps: true
});

CustomerSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Customers', CustomerSchema);