const express = require('express')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const { createBrand, updateBrand, deteleBrand, getBrand, getAllBrands } = require('../controller/brandCtrl')

const router = express.Router()

router.post('/', authMiddleware, isAdmin, createBrand)
router.put('/:id', authMiddleware, isAdmin, updateBrand)
router.delete('/:id', authMiddleware, isAdmin, deteleBrand)
router.get('/:id', getBrand)
router.get('/', getAllBrands)

module.exports = router