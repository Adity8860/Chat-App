import { Server as SocketIOServer } from "socket.io"
import http from "http"
import express from "express"

const app = express()
const httpServer = http.createServer(app)

const io = new SocketIOServer(httpServer, {
    cors: {
        origin: ["http://localhost:5173"]
    }
}) 

export function getReceiverSocketId(userId) {
    return userSocketMap[userId]
    
}


const userSocketMap =  {}

io.on("connection", (socket) => {
    console.log("A User is Connected!", socket.id)
    const userId = socket.handshake.query.userId
    if(userId)userSocketMap[userId] = socket.id


    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        console.log("A User is Disconnected", socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

export { io, app, httpServer as server }