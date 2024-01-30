const mongoose=require('mongoose');
const empschema=mongoose.Schema({
    firstname:{
        type:String,
        require:true
    },
    secondname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    jobtitle:{
        type:String,
        require:true
    },
    status:{
        type:String,
        require:true
    },
    
})
module.exports=mongoose.model('employee',empschema)