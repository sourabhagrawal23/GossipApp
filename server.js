const http = require('http')

const express = require('express')
const app = express()
const socketio = require('socket.io')

const SERVER_PORT = process.env.port || 3344

const server = http.createServer(app)
const io = socketio(server) //http://localhost:3344/socket.io/socket.io.js

let users = {
    'arnav': 'agag123'
}

let socketMap = {}

io.on('connection', (socket) => {
    console.log("Connected with socket id=", socket.id)

    socket.on('login', (data) => {
        // console.log('received', data.msg)

        function login(s, u) {
            s.join(u)
            s.emit('logged_in')
            socketMap[s.id] = u
        }
        if (users[data.username]) {
            if (users[data.username] == data.password) {
                login(socket, data.username)
            } else {
                socket.emit('login_failed')
            }
        } else {
            users[data.username] = data.password
            ogin(socket, data.username)
        }
    })

    socket.on('msg_send', (data) => {
        data.from = socketMap[socket.id]
        if (data.to) {
            io.to(data.to).emit('msg_recvd', data)
        } else {
            socket.broadcast.emit('msg_recvd', data)
        }
    })

    console.log(users)
    // socket.on('boom', () => {
    //     console.log('boom received from', socket.id)
    // })

    // setInterval(() => {
    //     socket.emit('whizz')
    // }, 2000)
})

app.use('/', express.static(__dirname + '/public'))

server.listen(SERVER_PORT, () => {
    console.log('Started on http://localhost:3344')
})