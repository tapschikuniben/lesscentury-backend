const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    category_name: { type: String },
    meta_tag_title: { type: String },
    meta_tag_description: { type: String },
    meta_tag_keyword: { type: String },
    parent_category: { type: String },
    status: { type: String },
    sort_index: { type: Number },
    created_by: { type: String },
    modified_by: { type: String },
    created_date: { type: Date },
    modified_date: { type: Date },
})

CategorySchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Categorys', CategorySchema);