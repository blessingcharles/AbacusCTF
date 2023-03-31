const mongoose = require('mongoose')
const moment = require("moment")

const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    creator:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'Users'
        
    },
    content:{
        type: String ,
        required: true
    },
    ttr:{
        type: String ,
        required: true
    },
    image:{
        type:String,
        required:true
    } ,
    createdAt:{
        type: Date ,
        default: moment().toDate() 
    }
})


articleSchema.pre("save" , (next)=>{
    if(this.new){
        this.createdAt = moment().toDate() ;
    }
    next() ;
})
module.exports = mongoose.model('article',articleSchema);