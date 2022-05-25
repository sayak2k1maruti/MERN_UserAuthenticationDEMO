const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    uname: {
        type: String,
        require: true,
        unique: true
    },
    passwd: {
        type: String,
        require: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const User = mongoose.model('user', userSchema)

module.exports = { User }