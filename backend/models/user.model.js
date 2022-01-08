const mongoose = require('mongoose');
const Task = require("../models/to-do.model")

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true, 'must providename'],
        trim:true,
        maxlength:[20, 'no longer than 20 characters']
    },
    lastName:{
        type:String,
        required:[true, 'must providename'],
        trim:true,
        maxlength:[20, 'no longer than 20 characters']
    },
    email:{
        type:String,
        required:[true, 'must providename'],
        trim:true,
        maxlength:[20, 'no longer than 20 characters']
    },
    password:{
        type:String,
        required:[true, 'must providename'],
        trim:true,
        maxlength:[20, 'no longer than 20 characters']
    },
    activeAccount:{
         type:Boolean,
         default:true
    },
    isNewUser:{
        type:Boolean,
        default:true
   },
    toDoList:[Task.schema]
})

module.exports = mongoose.model('ToDo', UserSchema)
