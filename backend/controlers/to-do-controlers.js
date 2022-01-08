const User = require("../models/user.model")
const Note = require("../models/to-do.model")

const getAllTodos = async(req,res) => {
    try {
        const users = await User.find({})
        res.status(200).json({users})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const createTodo = async(req,res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({user})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const getTodo = async(req,res) => {
    try {
        const {id:taskID} = req.params
        const user = await User.findOne({_id:taskID})
        if(!user){
            return res.status(404).json({msg:'NO user WAS FOUND'})
        }
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const updateToDo = async(req,res) => {
    try {
        const {id:taskID} = req.params
        const todo = await User.findOneAndUpdate({_id:taskID},req.body,{
            new:true,
            runValidators:true
        })
        if(!todo){
            return res.status(404).json({msg:'NO todo WAS FOUND'})
        }
        res.status(200).json({todo})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const deleteTodo = async(req,res) => {
    try {
        const {id:taskID} = req.params
        const user = await User.findOneAndDelete({_id:taskID})
        if(!user){
            return res.status(404).json({msg:'NO user WAS FOUND'})
        }
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

// module.exports = {
//     getAllToDos,
//     createToDo,
//     getToDo,
//     updateToDo,
//     deleteToDo
// }