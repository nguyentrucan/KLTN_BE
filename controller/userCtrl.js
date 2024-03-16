const { generateToken } = require('../config/jwtToken');
const User = require('../models/userModel')
const Product = require('../models/productModel')
const Cart = require('../models/cartModel')

const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongodbId');
const { generateRefeshToken } = require('../config/refreshToken')
const jwt = require('jsonwebtoken');
const sendEmail = require('./emailCtrl');
const crypto = require('crypto')

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
        const refreshToken = await generateRefeshToken(findUser?.id);
        const updateUser = await User.findByIdAndUpdate(findUser.id, {
            refreshToken: refreshToken,
        }, {
            new: true
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        })
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

// Admin Login
const loginAdmin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    //Check if user exists or not
    const findAdmin = await User.findOne({ email })
    if (findAdmin.role !== 'admin') {
        throw new Error('Not admin !')
    }
    if (findAdmin && await findAdmin.isPasswordMatched(password)) {
        const refreshToken = await generateRefeshToken(findAdmin?.id);
        const updateAdmin = await User.findByIdAndUpdate(findAdmin.id, {
            refreshToken: refreshToken,
        }, {
            new: true
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        })
        res.json({
            _id: findAdmin?._id,
            firstname: findAdmin?.firstname,
            lastname: findAdmin?.lastname,
            email: findAdmin?.email,
            mobile: findAdmin?.mobile,
            token: generateToken(findAdmin?._id),
        })
    } else {
        throw new Error("Invalid Credentials")
    }
})

//Handle Refresh Token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) {
        throw new Error('No Refresh Token in Cookies')
    }
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({
        refreshToken
    })
    if (!user) {
        throw new Error('No Refresh Token present in DB or not matched')
    }
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error('There is something wrong witch refresh token')
        }
        const accessToken = generateToken(user?.id)
        res.json({ accessToken })
    })
})

//Logout
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) {
        throw new Error('No Refresh Token in Cookies')
    }
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({
        refreshToken
    })
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        })
        return res.sendStatus(204); //forbidden
    }
    await User.findOneAndUpdate({ refreshToken }, {
        refreshToken: " ",
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    })
    res.sendStatus(204); //forbidden
})

//Update User
const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.user;
    validateMongoDbId(id);
    try {
        const updateUser = await User.findByIdAndUpdate(id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile,
        }, {
            new: true
        })
        res.json({ updateUser })
    } catch (error) {
        throw new Error(error)
    }
})

//Save user address
const saveAddress = asyncHandler(async (req, res, next) => {
    const { id } = req.user;
    validateMongoDbId(id)
    try {
        const updateUser = await User.findByIdAndUpdate(id, {
            address: req?.body?.address,
        }, {
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
    validateMongoDbId(id)
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
    validateMongoDbId(id)
    try {
        const deleteUser = await User.findByIdAndDelete(id)
        res.json({ deleteUser })
    } catch (error) {
        throw new Error(error)
    }
})

//Block user
const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const block = await User.findByIdAndUpdate(id, {
            isBlocked: true,
        }, {
            new: true,
        })
        res.json({
            message: "User blocked",
        })
    } catch (error) {
        throw new Error(error)
    }
})

//Unblock user
const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const unblock = await User.findByIdAndUpdate(id, {
            isBlocked: false,
        }, {
            new: true,
        })
        res.json({
            message: "User unblocked",
        })
    } catch (error) {
        throw new Error(error)
    }
})

const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongoDbId(_id);
    const user = await User.findById(_id)
    if (password) {
        user.password = password
        const updatedPassword = await user.save()
        res.json(updatedPassword);
    } else {
        res.json(user);
    }
})

const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found with this email')
    }
    try {
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</>`
        const data = {
            to: email,
            subject: "Forgot Password Link",
            text: "Hey User",
            htm: resetURL,
        }
        sendEmail(data)
        res.json(token)
    } catch (error) {
        throw new Error(error)
    }
})

const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    })
    if (!user) {
        throw new Error("Token Expired, Please try again later");
    }
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save()
    res.json(user)
})

const getWishList = asyncHandler(async (req, res) => {
    const { _id } = req.user
    validateMongoDbId(_id)
    try {
        const findUser = await User.findById(_id).populate('wishlist')
        res.json(findUser)
    } catch (error) {
        throw new Error(error)
    }
})

const userCart = asyncHandler(async (req, res) => {
    const { cart } = req.body
    const { _id } = req.user
    validateMongoDbId(_id)
    try {
        let products = []
        const user = await User.findById(_id)
        //Check if user already have product in cart
        const alreadyExistCart = await Cart.findOne({ orderby: user._id })
        if (alreadyExistCart) {
            alreadyExistCart.remove()
        }
        for (let i = 0; i < cart.length; i++) {
            let object = {}
            object.product = cart[i]._id
            object.count = cart[i].count
            object.color = cart[i].color
            let getPrice = await Product.findById(cart[i]._id).select("price").exec()
            object.price = getPrice.price
            products.push(object)
        }
        let cartTotal = 0
        for (let i = 0; i < products.length; i++) {
            cartTotal = cartTotal + products[i].price * products[i].count;
        }
        let newCart = await new Cart({
            products,
            cartTotal,
            orderby: user?._id,
        }).save();
        res.json(newCart)
    } catch (error) {
        throw new Error(error)
    }
})

const getUserCart = asyncHandler(async (req, res) => {
    const { _id } = req.user
    validateMongoDbId(_id)
    try {
        const cart = await Cart.findOne({ orderby: _id }).populate('products.product')
        res.json(cart)
    } catch (error) {
        throw new Error(error)
    }
})

const emptyCart = asyncHandler(async (req, res) => {
    const { _id } = req.user
    validateMongoDbId(_id)
    try {
        const user = await User.findOne({ _id })
        const cart = await Cart.findOneAndDelete({ orderby: user._id })
        res.json(cart)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = { createUser, login, getAllUsers, getUser, deleteUser, updateUser, blockUser, unblockUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword, loginAdmin, getWishList, saveAddress, userCart, getUserCart, emptyCart }