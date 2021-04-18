const mongoose=require('mongoose');

const Contact=mongoose.model('Contact',{
    Fullname:{
        type:String,
        require:true,
        trim:true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        require=true
    },
    phone:{
        type:Number,
        require:true
    },
    message:{
        type:String,
        require:true
    }
})

module.exports=Contact;