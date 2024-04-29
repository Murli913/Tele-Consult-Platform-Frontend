const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded");
    });

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name });
    });

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal);
    });

    socket.on("callEnded", (data) => {
        socket.to(data.to).emit("callEnded");
    });

    socket.on("message", (message) => {
        socket.broadcast.emit("message", message);
    });

    socket.on("startRecording", () => {
        socket.broadcast.emit("startRecording");
    });

    socket.on("stopRecording", () => {
        socket.broadcast.emit("stopRecording");
    });
});

server.listen(5000, () => console.log("Server is running on port 5000"));
