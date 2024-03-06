const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validateMongodbId');

const createBlog = asyncHandler(async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body)
        res.json(newBlog)
    } catch (error) {
        throw new Error(error);
    }
})

const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
            new: true,
        })
        res.json(updateBlog)
    } catch (error) {
        throw new Error(error);
    }
})

const getBlog = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const getBlog = await Blog.findById(id)
        await Blog.findByIdAndUpdate(id, {
            $inc: { numViews: 1 }
        }, {
            new: true,
        })
        res.json(getBlog)
    } catch (error) {
        throw new Error(error);
    }
})

const getAllBlogs = asyncHandler(async (req, res) => {
    try {
        const getAllBlogs = await Blog.find()
        res.json(getAllBlogs)
    } catch (error) {
        throw new Error(error);
    }
})

const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const deleteBlog = await Blog.findByIdAndDelete(id)
        res.json(deleteBlog)
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = { createBlog, updateBlog, getBlog, getAllBlogs, deleteBlog }