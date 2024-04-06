const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
    cors: {
        origin: "https://localhost:3000",
        methods: ["GET", "POST"]
    }
})


io.on("connection", (socket) => {
    socket.emit("me", socket.id)

    socket.on("disconnect", () => {
        socket.broadcast.emit("Call Ended")
    })

    socket.on("calluser", (data) => {
        io.to(data.userToCall).emit("callUser", {signal: data.signalData, from: data.from, name: data.name})
        
    })

    socket.on("answerCall", (data) => io.to(data.to).emit("callAccepted"), data.signal)

    
})


server.listen(5000, () => console.log("Server is running on port 5000"))