const User = require("../models/user.model")
const Task = require("../models/to-do.model")

const createTodo = async(req,res) => { 
    try {
        const {id:taskID} = req.params
        const user = await User.findOne({_id:taskID}, function(err, user){
            const taskModel = new Task();
            taskModel.title = req.body.title
            user.toDoList.unshift(taskModel)
            user.save()
        })
        res.status(201).json({user})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const updateTodo = async(req,res) => {
    try {
        const {id:taskID} = req.params
        const user = await User.findOne({_id:taskID}, function(err, user){
            user.toDoList.forEach(item=>{
                if (item._id == req.query.taskID) {
                    item.title = req.body.title
                    item.completed = req.body.completed
                    item.completionDate = req.body.completionDate
                }
            })
            user.save()
        })
        if(!user){
            return res.status(404).json({msg:'NO todo WAS FOUND'})
        }
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const deleteTodo = async(req,res) => {
    try {
        const {id:taskID} = req.params
        const user = await User.findOne({_id:taskID}, function(err, user){
            const newTaskList = []
            user.toDoList.forEach(item=>{item._id != req.query.taskID && newTaskList.push(item)})
            user.toDoList = newTaskList
            user.save()
        })
        res.status(201).json({user})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

module.exports = {
    createTodo,
    updateTodo,
    deleteTodo
}