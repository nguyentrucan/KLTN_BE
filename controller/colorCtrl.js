const Color = require('../models/colorModel')
const validateMongoDbId = require('../utils/validateMongodbId')
const asyncHandler = require('express-async-handler')

const createColor = asyncHandler(async (req, res) => {
    try {
        const newColor = await Color.create(req.body)
        res.json(newColor)
    } catch (error) {
        throw new Error(error)
    }
})

const updateColor = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const updateColor = await Color.findByIdAndUpdate(id, req.body, { new: true })
        res.json(updateColor)
    } catch (error) {
        throw new Error(error)
    }
})

const deteleColor = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const deteleColor = await Color.findByIdAndDelete(id)
        res.json(deteleColor)
    } catch (error) {
        throw new Error(error)
    }
})

const getColor = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const getColor = await Color.findById(id)
        res.json(getColor)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllColors = asyncHandler(async (req, res) => {
    try {
        const getAllColors = await Color.find()
        res.json(getAllColors)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = { createColor, updateColor, deteleColor, getColor, getAllColors }