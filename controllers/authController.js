require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Chat = require('../models/chat')
const bcrypt = require('bcrypt')
const saltRounds = parseInt(process.env.SALT_ROUNDS)
let password1 = process.env.USER1SEED
let password2 = process.env.USER2SEED
let password3 = process.env.USER3SEED
let password4 = process.env.USER4SEED
let password5 = process.env.USER5SEED
let password6 = process.env.USER6SEED
let password7 = process.env.USER7SEED
let password8 = process.env.USER8SEED
let password9 = process.env.USER9SEED
let password10 = process.env.USER10SEED
let password11 = process.env.USER11SEED
let password12 = process.env.USER12SEED
let password13 = process.env.USER13SEED
let password14 = process.env.USER14SEED
let password15 = process.env.USER15SEED
let password16 = process.env.USER16SEED
let password17 = process.env.USER17SEED
let password18 = process.env.USER18SEED
let password19 = process.env.USER19SEED
let password20 = process.env.USER20SEED
let password21 = process.env.USER21SEED
let password22 = process.env.USER22SEED
let password23 = process.env.USER23SEED
let password24 = process.env.USER24SEED
let password25 = process.env.USER25SEED
let password26 = process.env.USER26SEED
let password27 = process.env.USER27SEED

router.get('/', (req, res)=>{
    res.send('log in page')
})
// router.get('/seed', async (req, res)=>{
//     await User.deleteMany({})
//     await Chat.deleteMany({})
//     // const starterUsers = [
//     //     {username:'a', password:'a'},
//     //     {username:'b', password:'b'},
//     //     {username:'c', password:'c'},
//     //     {username:'d', password:'d'},
//     //     {username:'e', password:'e'},
//     //     {username:'f', password:'f'},
//     // ]
//     let seedPasswords = [password1, password2, password3, password4, password5, password6, password7, password8, password9, password10, password11, password12, password13, password14, password15, password16, password17, password18, password19, password20, password21, password22, password23, password24, password25, password26, password27]
//     let hashedPasswords = []
//     for (const password of seedPasswords){
//         const hashedPassword = await bcrypt.hash(password, saltRounds)
//         hashedPasswords.push(hashedPassword)
//     }
//     const starterUsers = [
//         {
//           username: 'user1',
//           password: hashedPasswords[0],
//           firstName: 'John',
//           lastName: 'Doe',
//           age: 25,
//           job: 'Software Developer',
//           gender: 0,
//           interestedIn: [1],
//           promptChoices: [0, 2, 4],
//           promptAnswers: ['Blue', 'Pizza', 'Bohemian Rhapsody'],
//           profilePic: 'https://picsum.photos/200/200',
//           pictures: ['https://picsum.photos/200/300', 'https://picsum.photos/300/300', 'https://picsum.photos/300/200'],
//         },
//         {
//           username: 'user2',
//           password: hashedPasswords[1],
//           firstName: 'Jane',
//           lastName: 'Smith',
//           age: 30,
//           job: 'Data Scientist',
//           gender: 1,
//           interestedIn: [0],
//           promptChoices: [1, 3, 5],
//           promptAnswers: ['Dog', 'Pasta', 'The Shawshank Redemption'],
//           profilePic: 'https://picsum.photos/200/201',
//           pictures: ['https://picsum.photos/200/301', 'https://picsum.photos/300/301', 'https://picsum.photos/300/201'],
//         },
//         {
//           username: 'user3',
//           password: hashedPasswords[2],
//           firstName: 'Chris',
//           lastName: 'Johnson',
//           age: 28,
//           job: 'UX Designer',
//           gender: 0,
//           interestedIn: [0, 1],
//           promptChoices: [2, 4, 0],
//           promptAnswers: ['Sushi', 'Bohemian Rhapsody', 'Green'],
//           profilePic: 'https://picsum.photos/200/202',
//           pictures: ['https://picsum.photos/200/302', 'https://picsum.photos/300/302', 'https://picsum.photos/300/202'],
//         },
//         {
//           username: 'user4',
//           password: hashedPasswords[3],
//           firstName: 'Alex',
//           lastName: 'Taylor',
//           age: 35,
//           job: 'Marketing Manager',
//           gender: 2,
//           interestedIn: [0, 1, 2],
//           promptChoices: [3, 1, 5],
//           promptAnswers: ['The Dark Knight', 'Pasta', '1984'],
//           profilePic: 'https://picsum.photos/200/203',
//           pictures: ['https://picsum.photos/200/303', 'https://picsum.photos/300/303', 'https://picsum.photos/300/203'],
//         },
//         {
//           username: 'user5',
//           password: hashedPasswords[4],
//           firstName: 'Sam',
//           lastName: 'Miller',
//           age: 22,
//           job: 'Student',
//           gender: 1,
//           interestedIn: [0, 2],
//           promptChoices: [4, 2, 0],
//           promptAnswers: ['Bohemian Rhapsody', 'Sushi', 'Blue'],
//           profilePic: 'https://picsum.photos/200/204',
//           pictures: ['https://picsum.photos/200/304', 'https://picsum.photos/300/304', 'https://picsum.photos/300/204'],
//         },
//         {
//           username: 'user6',
//           password: hashedPasswords[5],
//           firstName: 'Emily',
//           lastName: 'Williams',
//           age: 27,
//           job: 'Graphic Designer',
//           gender: 1,
//           interestedIn: [0],
//           promptChoices: [1, 3, 5],
//           promptAnswers: ['Cat', 'Burgers', 'Inception'],
//           profilePic: 'https://picsum.photos/200/205',
//           pictures: ['https://picsum.photos/200/305', 'https://picsum.photos/300/305', 'https://picsum.photos/300/205'],
//         },
//         {
//           username: 'user7',
//           password: hashedPasswords[6],
//           firstName: 'Michael',
//           lastName: 'Clark',
//           age: 32,
//           job: 'Engineer',
//           gender: 0,
//           interestedIn: [1],
//           promptChoices: [2, 4, 0],
//           promptAnswers: ['Sushi', 'Hotel California', 'Green'],
//           profilePic: 'https://picsum.photos/200/206',
//           pictures: ['https://picsum.photos/200/306', 'https://picsum.photos/300/306', 'https://picsum.photos/300/206'],
//         },
//         {
//           username: 'user8',
//           password: hashedPasswords[7],
//           firstName: 'Emma',
//           lastName: 'Johnson',
//           age: 29,
//           job: 'Teacher',
//           gender: 1,
//           interestedIn: [0, 2],
//           promptChoices: [3, 1, 5],
//           promptAnswers: ['The Shawshank Redemption', 'Pasta', 'Purple'],
//           profilePic: 'https://picsum.photos/200/207',
//           pictures: ['https://picsum.photos/200/307', 'https://picsum.photos/300/307', 'https://picsum.photos/300/207'],
//         },
//         {
//           username: 'user9',
//           password:  hashedPasswords[8],
//           firstName: 'Ryan',
//           lastName: 'Baker',
//           age: 26,
//           job: 'Fitness Trainer',
//           gender: 0,
//           interestedIn: [1],
//           promptChoices: [4, 2, 0],
//           promptAnswers: ['Imagine', 'Salad', 'Blue'],
//           profilePic: 'https://picsum.photos/200/208',
//           pictures: ['https://picsum.photos/200/308', 'https://picsum.photos/300/308', 'https://picsum.photos/300/208'],
//         },
//         {
//           username: 'user10',
//           password: hashedPasswords[9],
//           firstName: 'Olivia',
//           lastName: 'Smith',
//           age: 31,
//           job: 'Marketing Specialist',
//           gender: 1,
//           interestedIn: [0, 2],
//           promptChoices: [3, 1, 5],
//           promptAnswers: ['Inception', 'Pizza', 'Yellow'],
//           profilePic: 'https://picsum.photos/200/209',
//           pictures: ['https://picsum.photos/200/309', 'https://picsum.photos/300/309', 'https://picsum.photos/300/209'],
//         },
//         {
//           username: 'user11',
//           password:  hashedPasswords[10],
//           firstName: 'Daniel',
//           lastName: 'Brown',
//           age: 28,
//           job: 'Writer',
//           gender: 0,
//           interestedIn: [1],
//           promptChoices: [2, 4, 0],
//           promptAnswers: ['Sushi', 'Stairway to Heaven', 'Green'],
//           profilePic: 'https://picsum.photos/201/200',
//           pictures: ['https://picsum.photos/201/300', 'https://picsum.photos/301/300', 'https://picsum.photos/301/200'],
//         },
//         {
//           username: 'user12',
//           password: hashedPasswords[11],
//           firstName: 'Sophia',
//           lastName: 'Davis',
//           age: 34,
//           job: 'Architect',
//           gender: 1,
//           interestedIn: [0],
//           promptChoices: [1, 3, 5],
//           promptAnswers: ['Dog', 'Burgers', 'The Dark Knight'],
//           profilePic: 'https://picsum.photos/202/200',
//           pictures: ['https://picsum.photos/202/300', 'https://picsum.photos/302/300', 'https://picsum.photos/302/200'],
//         },
//         {
//           username: 'user13',
//           password: hashedPasswords[12],
//           firstName: 'Ethan',
//           lastName: 'Moore',
//           age: 27,
//           job: 'Software Engineer',
//           gender: 0,
//           interestedIn: [1],
//           promptChoices: [4, 2, 0],
//           promptAnswers: ['Bohemian Rhapsody', 'Sushi', 'Blue'],
//           profilePic: 'https://picsum.photos/203/200',
//           pictures: ['https://picsum.photos/203/300', 'https://picsum.photos/303/300', 'https://picsum.photos/303/200'],
//         },
//         {
//           username: 'user14',
//           password: hashedPasswords[13],
//           firstName: 'Isabella',
//           lastName: 'White',
//           age: 29,
//           job: 'Data Analyst',
//           gender: 1,
//           interestedIn: [0, 2],
//           promptChoices: [3, 1, 5],
//           promptAnswers: ['The Shawshank Redemption', 'Pizza', 'Yellow'],
//           profilePic: 'https://picsum.photos/204/200',
//           pictures: ['https://picsum.photos/204/300', 'https://picsum.photos/304/300', 'https://picsum.photos/304/200'],
//         },
//         {
//           username: 'user15',
//           password: hashedPasswords[14],
//           firstName: 'Matthew',
//           lastName: 'Jones',
//           age: 25,
//           job: 'Graphic Designer',
//           gender: 0,
//           interestedIn: [1],
//           promptChoices: [2, 4, 0],
//           promptAnswers: ['Sushi', 'Hotel California', 'Green'],
//           profilePic: 'https://picsum.photos/205/200',
//           pictures: ['https://picsum.photos/205/300', 'https://picsum.photos/305/300', 'https://picsum.photos/305/200'],
//         },
//         {
//           username: 'user16',
//           password: hashedPasswords[15],
//           firstName: 'Ava',
//           lastName: 'Miller',
//           age: 31,
//           job: 'Teacher',
//           gender: 1,
//           interestedIn: [0, 2],
//           promptChoices: [1, 3, 5],
//           promptAnswers: ['Cat', 'Burgers', 'The Dark Knight'],
//           profilePic: 'https://picsum.photos/206/200',
//           pictures: ['https://picsum.photos/206/300', 'https://picsum.photos/306/300', 'https://picsum.photos/306/200'],
//         },
//         {
//           username: 'user17',
//           password: hashedPasswords[16],
//           firstName: 'David',
//           lastName: 'Anderson',
//           age: 28,
//           job: 'UX Designer',
//           gender: 0,
//           interestedIn: [1],
//           promptChoices: [4, 2, 0],
//           promptAnswers: ['Imagine', 'Salad', 'Blue'],
//           profilePic: 'https://picsum.photos/207/200',
//           pictures: ['https://picsum.photos/207/300', 'https://picsum.photos/307/300', 'https://picsum.photos/307/200'],
//         },
//         {
//           username: 'user18',
//           password: hashedPasswords[17],
//           firstName: 'Mia',
//           lastName: 'Garcia',
//           age: 34,
//           job: 'Marketing Manager',
//           gender: 1,
//           interestedIn: [0],
//           promptChoices: [3, 1, 5],
//           promptAnswers: ['Inception', 'Pasta', 'Purple'],
//           profilePic: 'https://picsum.photos/208/200',
//           pictures: ['https://picsum.photos/208/300', 'https://picsum.photos/308/300', 'https://picsum.photos/308/200'],
//         },
//         {
//           username: 'user19',
//           password: hashedPasswords[18],
//           firstName: 'Christopher',
//           lastName: 'Walker',
//           age: 26,
//           job: 'Fitness Trainer',
//           gender: 0,
//           interestedIn: [1],
//           promptChoices: [2, 4, 0],
//           promptAnswers: ['Sushi', 'Stairway to Heaven', 'Green'],
//           profilePic: 'https://picsum.photos/209/200',
//           pictures: ['https://picsum.photos/209/300', 'https://picsum.photos/309/300', 'https://picsum.photos/309/200'],
//         },
//         {
//           username: 'user20',
//           password: hashedPasswords[19],
//           firstName: 'Sophie',
//           lastName: 'Hill',
//           age: 31,
//           job: 'Marketing Specialist',
//           gender: 1,
//           interestedIn: [0, 2],
//           promptChoices: [1, 3, 5],
//           promptAnswers: ['Dog', 'Burgers', 'The Dark Knight'],
//           profilePic: 'https://picsum.photos/200/210',
//           pictures: ['https://picsum.photos/200/310', 'https://picsum.photos/310/300', 'https://picsum.photos/310/200'],
//         },
//         {
//           username: 'user21',
//           password: hashedPasswords[20],
//           firstName: 'Nicholas',
//           lastName: 'Adams',
//           age: 28,
//           job: 'Writer',
//           gender: 0,
//           interestedIn: [1],
//           promptChoices: [4, 2, 0],
//           promptAnswers: ['Bohemian Rhapsody', 'Sushi', 'Blue'],
//           profilePic: 'https://picsum.photos/200/220',
//           pictures: ['https://picsum.photos/200/320', 'https://picsum.photos/300/320', 'https://picsum.photos/300/220'],
//         },
//         {
//           username: 'user22',
//           password: hashedPasswords[21],
//           firstName: 'Grace',
//           lastName: 'Baker',
//           age: 34,
//           job: 'Architect',
//           gender: 1,
//           interestedIn: [0],
//           promptChoices: [3, 1, 5],
//           promptAnswers: ['The Shawshank Redemption', 'Pizza', 'Yellow'],
//           profilePic: 'https://picsum.photos/200/230',
//           pictures: ['https://picsum.photos/200/330', 'https://picsum.photos/300/330', 'https://picsum.photos/300/230'],
//         },
//         {
//           username: 'user23',
//           password: hashedPasswords[22],
//           firstName: 'Andrew',
//           lastName: 'Barnes',
//           age: 27,
//           job: 'Software Engineer',
//           gender: 0,
//           interestedIn: [1],
//           promptChoices: [4, 2, 0],
//           promptAnswers: ['Bohemian Rhapsody', 'Sushi', 'Blue'],
//           profilePic: 'https://picsum.photos/200/240',
//           pictures: ['https://picsum.photos/200/340', 'https://picsum.photos/300/340', 'https://picsum.photos/300/240'],
//         },
//         {
//           username: 'user24',
//           password: hashedPasswords[23],
//           firstName: 'Ella',
//           lastName: 'Young',
//           age: 29,
//           job: 'Data Analyst',
//           gender: 1,
//           interestedIn: [0, 2],
//           promptChoices: [3, 1, 5],
//           promptAnswers: ['The Shawshank Redemption', 'Pizza', 'Yellow'],
//           profilePic: 'https://picsum.photos/200/250',
//           pictures: ['https://picsum.photos/200/350', 'https://picsum.photos/300/350', 'https://picsum.photos/300/250'],
//         },
//         {
//           username: 'user25',
//           password: hashedPasswords[24],
//           firstName: 'Jacob',
//           lastName: 'Clark',
//           age: 25,
//           job: 'Graphic Designer',
//           gender: 0,
//           interestedIn: [1],
//           promptChoices: [2, 4, 0],
//           promptAnswers: ['Sushi', 'Hotel California', 'Green'],
//           profilePic: 'https://picsum.photos/200/260',
//           pictures: ['https://picsum.photos/200/360', 'https://picsum.photos/300/360', 'https://picsum.photos/300/260'],
//         },
//         {
//           username: 'user26',
//           password: hashedPasswords[25],
//           firstName: 'Avery',
//           lastName: 'King',
//           age: 31,
//           job: 'Teacher',
//           gender: 1,
//           interestedIn: [0, 2],
//           promptChoices: [1, 3, 5],
//           promptAnswers: ['Cat', 'Burgers', 'The Dark Knight'],
//           profilePic: 'https://picsum.photos/210/200',
//           pictures: ['https://picsum.photos/210/300', 'https://picsum.photos/310/300', 'https://picsum.photos/310/200'],
//         },
//         {
//           username: 'user27',
//           password: hashedPasswords[26],
//           firstName: 'Benjamin',
//           lastName: 'Harris',
//           age: 28,
//           job: 'UX Designer',
//           gender: 0,
//           interestedIn: [1],
//           promptChoices: [4, 2, 5],
//             promptAnswers: ['Imagine', 'Salad', 'Blue'],
//             profilePic: 'https://picsum.photos/200/200',
//             pictures: ['https://picsum.photos/200/300', 'https://picsum.photos/300/300', 'https://picsum.photos/300/200'],
//         },
//     ]
//     await User.create(starterUsers)
//     const users = await User.find({})
//     res.json(users)
// })

router.post('/login', async (req, res)=>{
    const userToLogin = await User.findOne({username: req.body.username})
    if (userToLogin){
        bcrypt.compare(req.body.password, userToLogin.password, (err, result)=>{
            if (result){
                req.session.userid = userToLogin._id
                res.json(req.session)
            } else {
              res.status(400).json('incorrect username or password')
            }
        }) 
    }
})

router.post('/signup', async (req, res)=>{
    bcrypt.hash(req.body.password, saltRounds, async (err, hashedPassword)=>{
        const createdUser = await User.create({...req.body, password: hashedPassword})
        res.json(createdUser)
    })
    // const createdUser = await User.create(req.body)
    // res.json(createdUser)
})

router.get('/logout', (req, res)=>{
    console.log(req.session.token.userid);
    req.session.destroy()
    console.log('logged out');
    console.log(req.session.userid);
    res.redirect('/')
})

module.exports = router