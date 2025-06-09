const { error } = require('console')
const mongoose = require('mongoose')


const connectDB = async () => {
    await mongoose.connect(`${process.env.MONGODB_URI}/priscripto`)
    .then(() => console.log('mongodb database connected'))
    .catch(error, (error) => {
        console.log('connection failed', error);
    })
}


module.exports = connectDB