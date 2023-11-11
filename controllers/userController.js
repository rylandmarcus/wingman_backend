require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.get('/', async (req, res)=>{
    const users = await User.find({})
    res.json(users)
})

router.get('/:id', async (req, res)=>{
    // const token = req.session.token
    // const userid = jwt.verify(token, 'your-secret-key', (err, decoded) => {
    //     if (err) {
    //       // Handle invalid token
    //       return res.status(401).json({ error: 'Invalid token' });
    //     }
      
    //     const userId = decoded.userid;
    //     // Now you have the user ID, and you can use it in your logic
    //     console.log(`User ID: ${userId}`);
      
    //     // Continue with your route logic here
    //     return userId.toHexString();
    //   });
    // const user = await User.findById(userid)
    // const user = await User.findById(req.session.token)
    const user = await User.findById(req.params.id)
    res.json(user)
})

router.put('/:id', async (req, res)=>{
    res.json(
        await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    )
})

module.exports = router