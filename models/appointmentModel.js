const mongoose=require('mongoose');
const {ObjectId}=require('bson')

const Appointment=mongoose.model('Appointment',{
   DocId:{
       type:ObjectId
   },
   UID:{
       type:ObjectId
   },
   date:{
       type:String
   },
   time:{
       type:String
   }

})

module.exports=Appointment