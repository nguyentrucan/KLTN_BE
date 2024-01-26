const express = require('express')
const router = express.Router()
const { createUser, login, getAllUsers, getUser, deleteUser, updateUser, blockUser, unblockUser, handleRefreshToken } = require('../controller/userCtrl')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')

router.post('/register', createUser)
router.post('/login', login)
router.get('/all-users', getAllUsers)
router.get('/refreshtoken', handleRefreshToken)
router.get('/:id', authMiddleware, isAdmin, getUser)
router.delete('/:id', deleteUser)
router.put('/edit-user', authMiddleware, updateUser)
router.put('/block-user/:id', authMiddleware,isAdmin, blockUser)
router.put('/unblock-user/:id', authMiddleware,isAdmin, unblockUser)

module.exports = router