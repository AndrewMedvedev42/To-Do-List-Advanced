const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'must providename'],
        trim:true,
        maxlength:[20, 'no longer than 20 characters']
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

module.exports = mongoose.model('Task', ToDoSchema)