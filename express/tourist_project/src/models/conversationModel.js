const mongoose = require('mongoose')

const ConversationSchema = new mongoose.Schema({
    name_conversation: {
        type: String,
    },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    lastMessage: {
        type: String,
    },
    message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    }

},{timestamps: true})

module.exports = mongoose.model('Conversation', ConversationSchema)