const express = require('express')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const { createColor, updateColor, deteleColor, getColor, getAllColors } = require('../controller/colorCtrl')

const router = express.Router()

router.post('/', authMiddleware, isAdmin, createColor)
router.put('/:id', authMiddleware, isAdmin, updateColor)
router.delete('/:id', authMiddleware, isAdmin, deteleColor)
router.get('/:id', getColor)
router.get('/', getAllColors)

module.exports = router