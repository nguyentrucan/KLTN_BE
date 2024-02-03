const express = require('express')
const router = express.Router()
const { createProduct, getProduct, getAllProduct, updateProduct } = require('../controller/productCtrl')

router.post('/', createProduct)
router.get('/:id', getProduct)
router.put('/:id', updateProduct)
router.get('/', getAllProduct)

module.exports = router;