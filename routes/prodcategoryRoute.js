const express = require('express')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const { createCategory, updateCategory, deteleCategory, getCategory, getAllCategories } = require('../controller/prodcategoryCtrl')

const router = express.Router()

router.post('/', authMiddleware, isAdmin, createCategory)
router.put('/:id', authMiddleware, isAdmin, updateCategory)
router.delete('/:id', authMiddleware, isAdmin, deteleCategory)
router.get('/:id', getCategory)
router.get('/', getAllCategories)

module.exports = router