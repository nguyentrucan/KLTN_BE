const express = require('express')
const dbConnect = require('./config/dbConnect')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4000

const authRoute = require('./routes/authRoute')
const productRoute = require('./routes/productRoute')
const blogRoute = require('./routes/blogRoute')
const prodcategoryRoute = require('./routes/prodcategoryRoute')
const blogcategoryRoute = require('./routes/blogcategoryRoute')
const brandRoute = require('./routes/brandRoute')
const couponRoute = require('./routes/couponRoute')
const colorRoute = require('./routes/colorRoute')
const enqRoute = require('./routes/enqRoute')
const uploadRoute = require('./routes/uploadRoute')

const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const { notFound, errorHandler } = require('./middlewares/errorHandler')
const cors = require('cors')

dbConnect();

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/user', authRoute)
app.use('/api/product', productRoute)
app.use('/api/blog', blogRoute)
app.use('/api/category', prodcategoryRoute)
app.use('/api/blogcategory', blogcategoryRoute)
app.use('/api/brand', brandRoute)
app.use('/api/coupon', couponRoute)
app.use('/api/color', colorRoute)
app.use('/api/enquiry', enqRoute)
app.use('/api/upload', uploadRoute)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
})