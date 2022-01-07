const express = require('express')
const router = express.Router()

const {getAllToDos, getToDo, createToDo, updateToDo, deleteToDo } = require("../controlers/to-do-controlers")
const {getAllUsers, getUser, getUserByEmail, createUser, updateUser, deleteUser} = require("../controlers/user-controls")

router.route('/login_register').post(createUser).get(getUserByEmail)

router.route('/users/:id').get(getUser)

// router.route('/users/:id/user-details')

// router.route('/users/:id/edit-note/:note-id')

router.route('/admin').get(getAllUsers)
router.route('/admin/:id').delete(deleteUser).patch(updateUser)
router.route('/admin/user/:id').get(getUser)

module.exports = router