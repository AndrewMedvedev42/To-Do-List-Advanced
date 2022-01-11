const User = require("../models/user.model")

//GETS ALL USERS FROM DATA BASE
const getAllUsers = async(req,res) => {
    const users = User.find({})
    console.log(users);
    try {
        const users = await User.find({})
        res.status(200).json({users})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

//POSTS NEW USER INTO DATA BASE
const createUser = async(req,res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({user})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

//GETS USER FROM DATA BASE
const getUser = async(req,res) => {
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

//GETS USER FROM DATA BASE BY EMAIL
const getUserByEmail = async(req,res) => {
    try {
        const {email} = req.query
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(404).json({msg:'NO user WAS FOUND'})
        }
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

//UPDATES USER IN DATA BASE
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

//DELETES USER FROM DATA BASE
const deleteUser = async(req,res) => {
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

//EXPORT OF CONTROLERS
module.exports = {
    getAllUsers,
    createUser,
    getUser,
    getUserByEmail,
    updateUser,
    deleteUser
}