const mongoose = require('../database/connection')

const chatSchema = new mongoose.Schema(
    {
        users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        authors: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        messages: String
    },
    {timestamps: true}
)

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat