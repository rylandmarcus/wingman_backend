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

const corsOptions = {
    origin: 'http://localhost:3000',
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
        origin: 'http://localhost:3000'
    }
})

io.on('connection', (socket)=>{
    console.log('a user connected');
    socket.on('message', (msg)=>{
        console.log('message: '+msg);
        io.emit('receive_message', msg)
    })
    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    })
})

server.listen(PORT, ()=>{
    console.log('running on port: '+PORT);
})