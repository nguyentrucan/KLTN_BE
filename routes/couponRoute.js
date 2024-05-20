const express = require('express');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { createCoupon, getAllCoupons, updateCoupon, deleteCoupon, getCoupon } = require('../controller/couponCtrl');

const router = express.Router();

router.post('/', authMiddleware, isAdmin, createCoupon)
router.get('/', authMiddleware, isAdmin, getAllCoupons)
router.get('/:id', authMiddleware, isAdmin, getCoupon)
router.put('/:id', authMiddleware, isAdmin, updateCoupon)
router.delete('/:id', authMiddleware, isAdmin, deleteCoupon)

module.exports = router