const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatMessageSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        required: true
    },
    isText: {
        type: Boolean,
        required: true
    },
    isImage: {
        type: Boolean,
        required: true
    },
    isAudio: {
        type: Boolean,
        required: true
    },
    message:  String,

    comment: String,
    seen: {
        type: Boolean,
        default: false
    },
    order: Number
}, { timestamps: true });

module.exports = mongoose.model('chatMessage', chatMessageSchema);