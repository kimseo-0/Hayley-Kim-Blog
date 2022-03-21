const mongoose = require('mongoose');

const {Schema} = mongoose;
const {Types: {ObjectId}} = Schema;
const chatSchema = new Schema({
    roomId : {
        type: Number,
        required: true,
    },
    userId : {
        type: Number,
        required: true,
    },
    nickName : {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
    imageUrl: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Chat', chatSchema);