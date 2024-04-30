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
const fs = require("fs");
const path = require("path");

// Create the "uploads" directory if it doesn't exist
const uploadsDirectory = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDirectory)) {
    fs.mkdirSync(uploadsDirectory);
}

// Function to send file to a specific socket
const sendFile = (socket, filename) => {
    const filePath = path.join(__dirname, "uploads", filename);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }
        socket.emit("file", { filename, fileData: data });
    });
};

io.on("connection", (socket) => {
    socket.emit("me", socket.id);

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name });
    });

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal);
    });

    socket.on("callEnded", (data) => {
        io.to(data.to).emit("callEnded");
        io.to(data.from).emit("callEnded"); // Inform the caller about call end
    });

    socket.on("message", (message) => {
        io.emit("message", message);
    });

    socket.on("startRecording", () => {
        io.emit("startRecording");
    });

    socket.on("stopRecording", () => {
        io.emit("stopRecording");
    });

    // Receive file from client
    socket.on("sendFile", (fileData) => {
        const filename = `file_${Date.now()}.txt`; // Generate unique filename
        const filePath = path.join(__dirname, "uploads", filename);
        fs.writeFile(filePath, fileData, (err) => {
            if (err) {
                console.error("Error saving file:", err);
                socket.emit("fileError", "Error saving file on server.");
                return;
            }
            // Send the file to all connected sockets except the sender
            socket.broadcast.emit("fileLink", { filename });
            socket.emit("fileSent", "File sent successfully.");
        });
    });

    // New endpoint to serve files
    app.use("/uploads", express.static(path.join(__dirname, "uploads")));
});

server.listen(5000, () => console.log("Server is running on port 5000"));
