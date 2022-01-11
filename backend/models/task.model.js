const mongoose = require('mongoose');
//TASK MODEL SCHEMA
const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'must providename'],
        trim:true,
        maxlength:[20, 'no longer than 20 characters']
    },
    description:{
        type:String,
        required:[true, 'must providename'],
        trim:true,
    },
    completed:{
        type:Boolean,
        default:false
    },
    completionDate:{
        type:String,
        default:"--/--/--"
    }
})

module.exports = mongoose.model('Task', TaskSchema)