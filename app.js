const express = require('express')
const app = express()
const path = require("path")
const { Socket } = require('socket.io')
const port = 3000

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))
const io = require('socket.io')(server)


app.use(express.static(path.join(__dirname, 'public')))

let socketConnected = new Set()

io.on('connection', onConnected)

function onConnected(socket){
    console.log(socket.id)
    socketConnected.add(socket.id)

    io.emit("clients-total", socketConnected.size)

    socket.on("disconnect", ()=>{
        console.log(`discooneted socket:`, socket.id)
        socketConnected.delete(socket.id)
        io.emit("clients-total", socketConnected.size)
    })

    socket.on("message",(data)=>{
        socket.broadcast.emit("chat-message", data)
    } )
}
