const mongoose = require('mongoose')
const connectToMongoose = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("Connected to database Successfully")
    } catch (err) {
        console.log(err)
    }
}

module.exports = { connectToMongoose }