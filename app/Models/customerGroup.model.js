const mongoose = require('mongoose');

const CustomerGroupSchema = mongoose.Schema({
    customerGroup_name: { type: String, required: true },
    status: { type: String, required: true },
    created_by: { type: String },
    modified_by: { type: String },
    created_date: { type: Date },
    modified_date: { type: Date },
}, {
    timestamps: true
});

CustomerGroupSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('customerGroups', CustomerGroupSchema);