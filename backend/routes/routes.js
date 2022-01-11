const express = require('express')
const router = express.Router()

//CONTROLERS
const { createTask, updateTask, deleteTask } = require("../controlers/task-controlers")
const {getAllUsers, getUser, getUserByEmail, createUser, updateUser, deleteUser} = require("../controlers/user-controls")


// REQUEST ROUTES
router.route('/login_register').post(createUser).get(getUserByEmail)

router.route('/users/:id').get(getUser).delete(deleteUser).patch(updateUser)

router.route('/task/:id').patch(updateTask).post(createTask).delete(deleteTask)

router.route('/admin').get(getAllUsers)

module.exports = router

