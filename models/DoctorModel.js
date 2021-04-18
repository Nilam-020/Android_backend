const mongoose = require('mongoose');
const Rating = require('./ratingModel');

const Doctor = mongoose.model('Doctor', {
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
    department: {
        type: String,
        required: true,
        trim: true
    },
    nmc: {
        type: String,
        require: true,
        trim: true
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
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    specialisation: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    consultationFee: {
        type: Number
    },
    worked:{
        type:String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    rating:{
        type:Number,
    }
})

module.exports = Doctor;