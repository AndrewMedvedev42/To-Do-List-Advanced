const User = require("../models/user.model")

const getAllUsers = async(req,res) => {
    try {
        const users = await User.find({})
        res.status(200).json({users})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const createUser = async(req,res) => {
    console.log(req.body);
    try {
        const user = await User.create(req.body)
        res.status(201).json({user})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const getUser = async(req,res) => {
    try {
        const {id:taskID} = req.params
        const todo = await User.findOne({_id:taskID})
        if(!todo){
            return res.status(404).json({msg:'NO todo WAS FOUND'})
        }
        res.status(200).json({todo})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const updateUser = async(req,res) => {
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

const deleteUser = async(req,res) => {
    try {
        const {id:taskID} = req.params
        const todo = await User.findOneAndDelete({_id:taskID})
        if(!todo){
            return res.status(404).json({msg:'NO todo WAS FOUND'})
        }
        res.status(200).json({todo})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

module.exports = {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
}