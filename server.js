require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const {Server} = require('socket.io')
const cors = require('cors')
const morgan = require('morgan')
const PORT = process.env.PORT
const secret = process.env.SECRET
const session = require('express-session')
const userController = require('./controllers/userController')
const authController = require('./controllers/authController')
const chatController = require('./controllers/chatController')
const Chat = require('./models/chat')

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    // origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({secret: secret}))

app.use('/auth', authController)
app.use('/users', userController)
app.use('/chats', chatController)

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        // origin: 'http://localhost:3000'
    }
})

io.on('connection', (socket)=>{
    console.log('a user connected');
    socket.on('loggedIn', (token)=>{
        console.log('logged in', token);
        socket.join(token)
    })
    socket.on('notify', (to, type)=>{
        if (type=='message'){
            socket.broadcast.to(to).emit('receiveNotification', type)
        }
        if (type=='match'){
            io.to(to).emit('receiveNotification', type)
        }
    })
    socket.on('message', (msg, chatId, userid)=>{
        console.log('message: '+msg);
        console.log('chatId: '+chatId);
        async function sendMessage(){
            await Chat.findByIdAndUpdate(chatId, {$push: {messages: msg, authors: userid}}, {new: true})
        }
        sendMessage()
        io.to(chatId).emit('receive_message', msg, userid)
    })
    socket.on('typing', (chatId, userid)=>{
        socket.broadcast.to(chatId).emit('receive_typing', userid)
    })
    socket.on('leaveChatRooms', (room)=>{
        socket.leave(room)
    })
    socket.on('joinChatRoom', (room)=>{
        socket.join(room)
    })
    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    })
})

server.listen(PORT, ()=>{
    console.log('running on port: '+PORT);
})