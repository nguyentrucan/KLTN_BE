const express = require('express')
const router = express.Router()
const { createProduct, getProduct, getAllProduct, updateProduct, deleteProduct, addToWishList, rating, deleteAllProduct } = require('../controller/productCtrl')
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware')

router.post('/', authMiddleware, isAdmin, createProduct)

router.get('/:id', getProduct)
router.put('/wishlist', authMiddleware, addToWishList)
router.put('/rating', authMiddleware, rating)

router.put('/:id', authMiddleware, isAdmin, updateProduct)
router.delete('/:id', authMiddleware, isAdmin, deleteProduct)

router.get('/', getAllProduct)

router.delete('/', authMiddleware, isAdmin, deleteAllProduct)

module.exports = router;