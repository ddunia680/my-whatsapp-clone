const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatSchema = new Schema({
    user1: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    user2: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    lastMessage: {
        type: String
    },
    sentBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);