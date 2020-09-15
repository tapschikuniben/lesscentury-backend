const mongoose = require('mongoose');

const CustomerGroupSchema = mongoose.Schema({
    customerGroup_name: { type: String, required: true },
    status: { type: String, required: true },
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
    created_date: { type: Date, required: true },
    modified_date: { type: Date, required: true },
}, {
    timestamps: true
});

CustomerGroupSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('customerGroups', CustomerGroupSchema);