const express = require('express')
const router = express.Router()
const { createUser, login, getAllUsers, getUser, deleteUser, updateUser } = require('../controller/userCtrl')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')

router.post('/register', createUser)
router.post('/login', login)
router.get('/all-users', getAllUsers)
router.get('/:id', authMiddleware, isAdmin, getUser)
router.delete('/:id', deleteUser)
router.put('/edit-user', authMiddleware, updateUser)

module.exports = router