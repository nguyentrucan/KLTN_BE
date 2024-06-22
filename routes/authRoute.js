const express = require('express')
const router = express.Router()
const { createUser, login, getAllUsers, getUser, deleteUser, updateUser, blockUser, unblockUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword, loginAdmin, getWishList, saveAddress, userCart, getUserCart, emptyCart, applyCoupon, createOrder, getOrders, updateOrderStatus, getAllOrders, getOrderByUserId, removeProductFromCart, updateProductQuantityFromCart, getMyOrders } = require('../controller/userCtrl')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const { checkout, paymentVerification } = require('../controller/paymentCtrl')

router.post('/register', createUser)
router.post('/forgot-password-token', forgotPasswordToken)
router.put('/reset-password/:token', resetPassword)
router.put('/password', authMiddleware, updatePassword)
router.post('/login', login)
router.post('/admin-login', loginAdmin)
router.post('/cart', authMiddleware, userCart)
router.post('/order/checkout', authMiddleware, checkout)
router.post('/order/paymentVerification', authMiddleware, paymentVerification)
router.post('/cart/create-order', authMiddleware, createOrder)

router.put('/order/update-order/:id', authMiddleware, isAdmin, updateOrderStatus)

router.post('/cart/applycoupon', authMiddleware, applyCoupon)

router.get('/all-users', getAllUsers)
router.get('/getmyorders', authMiddleware, getMyOrders)
router.get('/get-orders', authMiddleware, getOrders)
router.get('/getallorders', authMiddleware, isAdmin, getAllOrders)
router.post("/getorderbyuser/:id", authMiddleware, isAdmin, getAllOrders)
router.get('/refreshtoken', handleRefreshToken)
router.get('/logout', logout)
router.get('/wishlist', authMiddleware, getWishList)
router.get('/cart', authMiddleware, getUserCart)

router.get('/:id', authMiddleware, isAdmin, getUser)
router.delete('/empty-cart', authMiddleware, emptyCart)
router.delete('/delete-product-cart/:cartItemId', authMiddleware, removeProductFromCart)
router.delete('/update-product-cart/:cartItemId/:newQuantity', authMiddleware, updateProductQuantityFromCart)
router.delete('/:id', deleteUser)

router.put('/edit-user', authMiddleware, updateUser)
router.put('/save-address', authMiddleware, saveAddress)
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser)
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser)

module.exports = router