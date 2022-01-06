const mongoose = require('mongoose');

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
    toDoList:[
        {
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
             completionData:{
                type:String
            }
        }
    ]
})

module.exports = mongoose.model('ToDo', UserSchema)
