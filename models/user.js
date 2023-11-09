const mongoose = require('../database/connection')

const userSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        profilePic: String,
        promptChoices: [Number],
        promptAnswers: [String],
        pictures: [String],
        age: Number,
        job: String,
        gender: Number,
        interestedIn: [Number],
        likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        dislikes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    },
    {timestamps: true}
)

const User = mongoose.model('User', userSchema)

module.exports = User