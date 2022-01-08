const express = require('express')
const router = express.Router()

const { createTodo, updateTodo, deleteTodo } = require("../controlers/to-do-controlers")
const {getAllUsers, getUser, getUserByEmail, createUser, updateUser, deleteUser} = require("../controlers/user-controls")

router.route('/login_register').post(createUser).get(getUserByEmail)

router.route('/users/:id').get(getUser).post(createTodo).delete(deleteTodo)

router.route('/task/:id').delete(deleteTodo).patch(updateTodo).get(getUser)

router.route('/user/:id/edit-task').patch(updateTodo)

router.route('/admin').get(getAllUsers)
router.route('/admin/:id').delete(deleteUser).patch(updateUser)
router.route('/admin/user/:id').get(getUser)

module.exports = router