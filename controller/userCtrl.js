const { generateToken } = require('../config/jwtToken');
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

//Register
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        throw new Error('User Already Exist')
    }
})

//Login
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //Check if user exists or not
    const findUser = await User.findOne({ email })
    if (findUser && await findUser.isPasswordMatched(password)) {
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        })
    } else {
        throw new Error("Invalid Credentials")
    }
})

//Update User
const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.user;
    try {
        const updateUser = await User.findByIdAndUpdate(id,{
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile,
        },{
            new: true
        })
        res.json({ updateUser })
    } catch (error) {
        throw new Error(error)
    }
})

//Get all users
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const getAllUsers = await User.find()
        res.json(getAllUsers)
    } catch (error) {
        throw new Error(error)
    }
})

//Get single user
const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const getUser = await User.findById(id)
        res.json({ getUser })
    } catch (error) {
        throw new Error(error)
    }
})

//Delete a user
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const deleteUser = await User.findByIdAndDelete(id)
        res.json({ deleteUser })
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = { createUser, login, getAllUsers, getUser, deleteUser, updateUser }