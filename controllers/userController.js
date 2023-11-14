require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Chat = require('../models/chat')

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

router.get('/potentialmatches/:id', async (req, res)=>{
    const user = await User.findById(req.params.id)
    let dontInclude = user.likes.concat(user.dislikes)
    dontInclude.push(req.params.id)
    let potentialMatches
    if (user.interestedIn.length == 1){
        potentialMatches = await User.find().where('_id').nin(dontInclude).where('gender').equals(user.interestedIn[0])
        // potentialMatches = await User.find({_id: {$nin: req.params.id}}).where('gender').equals(user.interestedIn[0])
    } else if (user.interestedIn.length == 2){
        potentialMatches = await User.find().where('_id').nin(dontInclude).where('gender').or([{gender: user.interestedIn[0]}, {gender: user.interestedIn[1]}])
    } else if (user.interestedIn.length == 3){
        potentialMatches = await User.find().where('_id').nin(dontInclude)
    }
    res.json(potentialMatches)
})

router.put('/:userid/like/:likedid', async (req, res)=>{
    const likedUser = await User.findById(req.params.likedid)
    if (likedUser.likes.includes(req.params.userid)){
        console.log('match')
        await Chat.create({users: [req.params.userid, req.params.likedid]})
    }
    // if (req.body.match){
    //     console.log('match')
    //     await Chat.create({users: [req.params.userid, req.params.likedid]})
    // }
    const user = await User.findByIdAndUpdate(req.params.userid, {$push: {likes: req.params.likedid}}, {new: true})
    res.json(user)
})

router.put('/:userid/dislike/:dislikedid', async (req, res)=>{
    const user = await User.findByIdAndUpdate(req.params.userid, {$push: {dislikes: req.params.dislikedid}}, {new: true})
    res.json(user)
})

router.get('/:userid/matches', async (req, res)=>{
    const user = await User.findById(req.params.userid).populate('likes')
    res.json(user.likes.filter(like => like.likes.includes(req.params.userid)))
})

router.delete('/:userid/matches/:matchid', async (req, res)=>{
    const user = await User.findByIdAndUpdate(req.params.userid, {$pull: {likes: req.params.matchid}}, {new: true})
    const chat = await Chat.findOneAndDelete({users: [req.params.userid, req.params.matchid]})
    res.json(user)
})

module.exports = router