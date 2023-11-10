require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

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
    const userToLogin = await User.findOne({username: req.body.username})
    let passwordMatches = false
    if (userToLogin){
        passwordMatches = userToLogin.password === req.body.password
    }
    if (userToLogin&&passwordMatches){
        req.session.userid = userToLogin._id
        res.json(req.session)
        // const token = jwt.sign({userid: userToLogin._id}, process.env.SECRET)
        // req.session.token = token
        // res.json({token})
    } else {
        res.status(400).json('incorrect username or password')
    }
})

router.post('/signup', async (req, res)=>{
    const createdUser = await User.create(req.body)
    res.json(createdUser)
})

router.get('/logout', (req, res)=>{
    console.log(req.session.token.userid);
    req.session.destroy()
    console.log('logged out');
    console.log(req.session.userid);
    res.redirect('/')
})

module.exports = router