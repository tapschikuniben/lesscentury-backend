const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    category_name: { type: String, required: true },
    meta_tag_title: { type: String },
    meta_tag_description: { type: String },
    meta_tag_keyword: { type: String },
    parent_category: { type: String },
    status: { type: String, required: true },
    sort_index: { type: Number },
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
    created_date: { type: Date, required: true },
    modified_date: { type: Date, required: true },
}, {
    timestamps: true
});

CategorySchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Categories', CategorySchema);