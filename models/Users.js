const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true      
    },
    email: {
        type: String,
        required: true      
    },
    password: {
        type: String,
        required: true      
    },
    avatar: {
        type: String    
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('users', userSchema);
module.exports = User;