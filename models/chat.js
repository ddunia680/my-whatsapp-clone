const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatSchema = new Schema({
    user1: {
        type: Schema.Types.ObjectId,
        required: true
    },
    user2: {
        type: Schema.Types.ObjectId,
        required: true
    },
    lastMessage: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);