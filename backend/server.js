require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/mongodb')
const connectCloudinary = require('./config/cloudinary')
const adminRouter = require('./routes/adminRoute')
const doctorRouter = require('./routes/doctorRoute')
const userRouter = require('./routes/userRoute')

//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


//api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
   res.send('home');
})


app.listen(port, () => console.log(`server started on port: ${port}`))