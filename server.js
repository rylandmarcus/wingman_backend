require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const {Server} = require('socket.io')
const cors = require('cors')
const morgan = require('morgan')
const PORT = process.env.PORT

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

server.listen(PORT, ()=>{
    console.log('running on port: '+PORT);
})