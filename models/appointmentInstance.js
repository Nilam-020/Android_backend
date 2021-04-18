const mongoose = require('mongoose');
const {ObjectId} = require('bson');


const AppointmentInstance = mongoose.model('AppointmentInstance',{
    doctor_id :{type:ObjectId,required:true},
    time:{type:String,required:true},
    date:{type:String,required:true},
    hour:{type:Number,required:true},
    status:{type:Boolean,required:true,default:true}
})

module.exports = AppointmentInstance;