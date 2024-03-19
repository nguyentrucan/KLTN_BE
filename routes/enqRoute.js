const express = require('express')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const { createEnquiry, updateEnquiry, deteleEnquiry, getEnquiry, getAllEnquiries } = require('../controller/enqCtrl')

const router = express.Router()

router.post('/', createEnquiry)
router.put('/:id', authMiddleware, isAdmin, updateEnquiry)
router.delete('/:id', authMiddleware, isAdmin, deteleEnquiry)
router.get('/:id', getEnquiry)
router.get('/', authMiddleware, isAdmin, getAllEnquiries)

module.exports = router