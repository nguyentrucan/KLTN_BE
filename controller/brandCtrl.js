const Brand = require('../models/brandModel')
const validateMongoDbId = require('../utils/validateMongodbId')
const asyncHandler = require('express-async-handler')

const createBrand = asyncHandler(async (req, res) => {
    try {
        const newBrand = await Brand.create(req.body)
        res.json(newBrand)
    } catch (error) {
        throw new Error(error)
    }
})

const updateBrand = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const updateBrand = await Brand.findByIdAndUpdate(id, req.body, { new: true })
        res.json(updateBrand)
    } catch (error) {
        throw new Error(error)
    }
})

const deteleBrand = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const deteleBrand = await Brand.findByIdAndDelete(id)
        res.json(deteleBrand)
    } catch (error) {
        throw new Error(error)
    }
})

const getBrand = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const getBrand = await Brand.findById(id)
        res.json(getBrand)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllBrands = asyncHandler(async (req, res) => {
    try {
        const getAllBrands = await Brand.find()
        res.json(getAllBrands)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = { createBrand, updateBrand, deteleBrand, getBrand, getAllBrands }