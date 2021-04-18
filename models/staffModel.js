const mongoose = require('mongoose');

const Staff = mongoose.model('Staff', {
    profile: {
        type: String
    },
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    email: {
        type: String
    },
    gender: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        unique: true,
        required: true,
        trim: true

    },
    position: {
        type: String,
        trim: true,
        enum: ["HR", "Account", "Reception", "Administration"],
        default: "Reception"

    },

    password: {
        type: String,
        required: true,
        minlength: 8
    },
    user_type: {
        type: String,
        enum: ["Admin", "Staff"],
        default: "Staff",
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})


module.exports = Staff