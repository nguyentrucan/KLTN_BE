const Category = require('../models/prodcategoryModel')
const validateMongoDbId = require('../utils/validateMongodbId')
const asyncHandler = require('express-async-handler')

const createCategory = asyncHandler(async (req, res) => {
    try {
        const newCategory = await Category.create(req.body)
        res.json(newCategory)
    } catch (error) {
        throw new Error(error)
    }
})

const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const updateCategory = await Category.findByIdAndUpdate(id, req.body, { new: true })
        res.json(updateCategory)
    } catch (error) {
        throw new Error(error)
    }
})

const deteleCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const deteleCategory = await Category.findByIdAndDelete(id)
        res.json(deteleCategory)
    } catch (error) {
        throw new Error(error)
    }
})

const getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const getCategory = await Category.findById(id)
        res.json(getCategory)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllCategories = asyncHandler(async (req, res) => {
    try {
        const getAllCategories = await Category.find()
        res.json(getAllCategories)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = { createCategory, updateCategory, deteleCategory, getCategory, getAllCategories }