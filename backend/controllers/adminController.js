const validator = require('validator')
const bcrypt = require('bcrypt')
const { v2: cloudinary } = require('cloudinary')
const doctorModel = require('../models/doctorModel')
const jwt = require('jsonwebtoken')

// api for adding the doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        //checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" });
        }

        //validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        //validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        //hashing the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //uploading the image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageURL = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            image: imageURL,
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save()

        return res.json({ success: true, message: "Doctor added" })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

//api for admin login
const loginAdmin = async (req, res) => {
    try {

        console.log(req.body)
        const { email, password } = req.body


        // Check if email and password are provided
        if (!email || !password) {
            return res.json({
                success: false,
                message: "Email and password are required"
            });
        }

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

module.exports = {
    addDoctor,
    loginAdmin
}