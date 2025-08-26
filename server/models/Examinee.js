const mongoose = require('mongoose');

const examineeScheema = new mongoose.Schema({

    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    
    college:{
        type:String,
        require:true,
    },
     course:{
        type:String,
        require:true,
    },
    branch:{
        type:String,
        require:true,
    },
    session:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Session",
        require:true,
    },
    status:{
        type:String,
        default:"inactive",
        enum:["active","inactive","delete"]
    }
})

module.exports = mongoose.model('Examinee',examineeScheema);