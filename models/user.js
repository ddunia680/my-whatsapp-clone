const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    profileUrl: {
        type: String
    },
    status: {
        type: String,
        default: "Hey, I'm on whatsapp clone"
    },
    username: {
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
    lastSeen: String
});

module.exports = mongoose.model('User', userSchema);