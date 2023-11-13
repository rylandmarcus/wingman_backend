require('dotenv').config()
const express = require('express')
const router = express.Router()
const Chat = require('../models/chat')
const User = require('../models/user')

router.get('/', async (req, res)=>{
    const chats = await Chat.find({})
    res.json(chats)
})

router.get('/:id', async (req, res)=>{
    let chats = await Chat.find({users: req.params.id})   
    for (const chat of chats){
        chat.users.splice(chat.users.indexOf(req.params.id),1)
        await chat.populate('users')
    }
    res.json(chats)
})

router.get('/:userid/chat/:chatid', async (req, res)=>{
    let chat = await Chat.findById(req.params.chatid)  
    chat.users.splice(chat.users.indexOf(req.params.userid),1)
    await chat.populate('users')
    res.json(chat)
})


module.exports = router