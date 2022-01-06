const express = require('express')
const router = express.Router()

const {getAllToDos, getToDo, createToDo, updateToDo, deleteToDo } = require("../controlers/to-do-controlers")
const {getAllUsers, getUser, createUser, updateUser, deleteUser} = require("../controlers/user-controlers")

router.route('/login_register').post(createUser)

// router.route('/users/:id')

// router.route('/users/:id/user-details')

// router.route('/users/:id/edit-note/:note-id')

// router.route('/admin')

// router.route('/admin/console/user/:id')

module.exports = router