const express = require('express')
const router = express.Router()
const { createUser, login, getAllUsers, getUser, deleteUser, updateUser, blockUser, unblockUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword, loginAdmin, getWishList, saveAddress, userCart, getUserCart, emptyCart, applyCoupon, createOrder, getOrders, updateOrderStatus } = require('../controller/userCtrl')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')

router.post('/register', createUser)
router.post('/forgot-password-token', forgotPasswordToken)
router.put('/reset-password/:token', resetPassword)
router.put('/order/update-order/:id', authMiddleware, isAdmin, updateOrderStatus)

router.put('/password', authMiddleware, updatePassword)
router.post('/login', login)
router.post('/admin-login', loginAdmin)

router.post('/cart', authMiddleware, userCart)
router.post('/cart/applycoupon', authMiddleware, applyCoupon)
router.post('/cart/cash-order', authMiddleware, createOrder)

router.get('/all-users', getAllUsers)
router.get('/get-orders', authMiddleware, getOrders)
router.get('/refreshtoken', handleRefreshToken)
router.get('/logout', logout)
router.get('/wishlist', authMiddleware, getWishList)
router.get('/cart', authMiddleware, getUserCart)

router.get('/:id', authMiddleware, isAdmin, getUser)
router.delete('/empty-cart', authMiddleware, emptyCart)
router.delete('/:id', deleteUser)

router.put('/edit-user', authMiddleware, updateUser)
router.put('/save-address', authMiddleware, saveAddress)
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser)
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser)

module.exports = router