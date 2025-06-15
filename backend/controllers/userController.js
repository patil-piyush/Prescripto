const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const doctorModel = require('../models/doctorModel')
const userModel = require('../models/userModel')


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !password || !email) {
            return res.json({ success: false, message: "Missing Details!" })
        }
        //validating email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "incorrect email format!" })
        }
        //validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "enter a strong password" })
        }

        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        return res.json({ success: true, token })


    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "account doesn't exist!" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            return res.json({ success: true, token })
        }
        else {
            return res.json({ success: false, message: "incorrect password!" })
        }


    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}



//api to get user profile data
const getProfile = async (req, res) => {
    try {
        
        const userId = req.userId
        const userData = await userModel.findById(userId).select('-password')

        return res.json({success:true, userData})
        
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}


//api to update user profile data
const updateProfile = async (req,res) =>{
    
}


module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updateProfile
}