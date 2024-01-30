const mongoose=require('mongoose');
const userschema=mongoose.Schema({
    name:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:[true,"Email Is Required"]
        
    },
    password:{
        type:String,
        required:[true,"Password Is Required"]
    },
    role:{
        type:String,
        role:['user','admin']||'user'
    },
    token:{
        type:String
        
    }
});
const Users=mongoose.model('user',userschema);
module.exports=Users;