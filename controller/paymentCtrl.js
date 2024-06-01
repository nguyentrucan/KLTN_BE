const Razorpay = require('razorpay')

const instance = new Razorpay({
    key_id: "rzp_test_jk96M1tbCBGW2H",
    key_secret: "XQoOhx6YjCyCmJIGtYJaWAhg",
})

const checkout = async (req, res) => {
    const { amount } = req.body
    const option = {
        amount: amount,
        currency: "USD"
    }
    const order = await instance.orders.create(option)
    res.json({
        success: true,
        order
    })
}

const paymentVerification = async (req, res) => {
    const { razorpayOrderId, razorpayPaymentId } = req.body
    res.json({
        razorpayOrderId,
        razorpayPaymentId
    })
}

module.exports = {
    checkout,
    paymentVerification
}