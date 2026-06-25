
const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
author:{
    type:mongoose.Schema.Types._ObjectId,
    ref:'user',
    required:true
},
taskname:{
    type:String,
    
}
})