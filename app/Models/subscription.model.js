const mongoose = require('mongoose');

const SubscriptionSchema = mongoose.Schema({
    email: { type: String, required: true },
    timestamp: { type: Date },
})

SubscriptionSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Subscriptions', SubscriptionSchema);