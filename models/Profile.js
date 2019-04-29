const mongoose = require('mongoose');
const Schema = mongoose.Schema


const ProfileSchema =  new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Profile = mongoose.model('profile', ProfileSchema);
module.exports = Profile;