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

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({secret: secret}))

app.use('/auth', require('./controllers/authController'))

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