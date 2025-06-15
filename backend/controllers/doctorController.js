const doctorModel = require('../models/doctorModel')

// function to change the availability of the doctr by checking the checkbox 
const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body
        const data = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !data.available })
        res.json({ success: true, message: 'Availability Changed' })
    } catch (error) {
        console.log(error)
        res.json({ success: true, message: error.message })
    }
}

//function to get all doctors data for frontend
const doctorList = async (req,res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({success:true, doctors})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}




module.exports = {
    changeAvailability,
    doctorList
}