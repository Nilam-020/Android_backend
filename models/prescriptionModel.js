const mongoose = require('mongoose');
const {ObjectId}=require('bson')

const Prescription = mongoose.model('Prescription', {
    DocID: {
        type: ObjectId
    },
    pat_id:{
        type:ObjectId
    },
    medName: {
        type: String

    },
    routine: {
        type: String,
        enum: ["A", "D", "M", "E", "N"]
    },
    days: {
        type: String
    },
    date:{
        type:Date,
        default:Date.now

    }


})

module.exports = Prescription;