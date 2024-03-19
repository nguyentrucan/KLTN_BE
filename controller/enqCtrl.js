const Enquiry = require('../models/enqModel')
const validateMongoDbId = require('../utils/validateMongodbId')
const asyncHandler = require('express-async-handler')

const createEnquiry = asyncHandler(async (req, res) => {
    try {
        const newEnquiry = await Enquiry.create(req.body)
        res.json(newEnquiry)
    } catch (error) {
        throw new Error(error)
    }
})

const updateEnquiry = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const updateEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, { new: true })
        res.json(updateEnquiry)
    } catch (error) {
        throw new Error(error)
    }
})

const deteleEnquiry = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const deteleEnquiry = await Enquiry.findByIdAndDelete(id)
        res.json(deteleEnquiry)
    } catch (error) {
        throw new Error(error)
    }
})

const getEnquiry = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const getEnquiry = await Enquiry.findById(id)
        res.json(getEnquiry)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllEnquiries = asyncHandler(async (req, res) => {
    try {
        const getAllEnquiries = await Enquiry.find()
        res.json(getAllEnquiries)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = { createEnquiry, updateEnquiry, deteleEnquiry, getEnquiry, getAllEnquiries }