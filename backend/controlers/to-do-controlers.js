const ToDo = require("../models/user.model")

const getAllToDos = async(req,res) => {
    try {
        const todos = await ToDo.find({})
        res.status(200).json({todos})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const createToDo = async(req,res) => {
    try {
        const todo = await ToDo.create(req.body)
        res.status(201).json({todo})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const getToDo = async(req,res) => {
    try {
        const {id:taskID} = req.params
        const todo = await ToDo.findOne({_id:taskID})
        if(!todo){
            return res.status(404).json({msg:'NO todo WAS FOUND'})
        }
        res.status(200).json({todo})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const updateToDo = async(req,res) => {
    try {
        const {id:taskID} = req.params
        const todo = await ToDo.findOneAndUpdate({_id:taskID},req.body,{
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

const deleteToDo = async(req,res) => {
    try {
        const {id:taskID} = req.params
        const todo = await ToDo.findOneAndDelete({_id:taskID})
        if(!todo){
            return res.status(404).json({msg:'NO todo WAS FOUND'})
        }
        res.status(200).json({todo})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

module.exports = {
    getAllToDos,
    createToDo,
    getToDo,
    updateToDo,
    deleteToDo
}