require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req, res)=>{
    res.send('log in page')
})
router.get('/seed', async (req, res)=>{
    await User.deleteMany({})
    const starterUsers = [
        {username:'a', password:'a'},
        {username:'b', password:'b'},
        {username:'c', password:'c'},
        {username:'d', password:'d'},
        {username:'e', password:'e'},
        {username:'f', password:'f'},
    ]
    await User.create(starterUsers)
    const users = await User.find({})
    res.json(users)
})

router.post('/login', async (req, res)=>{
    console.log(req.body);
    res.json(req.body)
})

module.exports = router