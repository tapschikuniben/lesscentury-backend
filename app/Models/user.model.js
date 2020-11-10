// const mongoose = require('mongoose');

// const UsersSchema = mongoose.Schema({
//     username: { type: String, required: true },
//     first_name: { type: String, required: true },
//     last_name: { type: String, required: true },
//     email: { type: String, required: true },
//     address: { type: String, required: true },
//     phone: { type: Number, required: true },
//     city: { type: String, required: true },
//     country: { type: String, required: true },
//     gender: { type: String, required: true },
//     role_id: { type: String, required: true },
//     job_title: { type: String, required: true },
//     organisation: { type: String, required: true },
//     user_department: { type: String, required: true },
//     approvalpower: { type: String, required: true },
//     is_resource: { type: String, required: true },
//     hash: { type: String, required: true },
// }, {
//     timestamps: true
// });

// UsersSchema.set('toJSON', { virtuals: true });

// module.exports = mongoose.model('Userss', UsersSchema);

const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        first_name: String,
        last_name: String,
        username: String,
        email: String,
        password: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]
    })
);

module.exports = User;
