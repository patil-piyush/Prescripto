require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/mongodb')

//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()

//middlewares
app.use(express.json())
app.use(cors())


 //api endpoints
 app.get('/', (req,res)=>{
    res.send('home');
 })


 app.listen(port, ()=>console.log(`server started on port: ${port}`))