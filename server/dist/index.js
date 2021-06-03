"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const socket_io_1 = require("socket.io");
const http = require("http");
const router_1 = require("./router/router");
const users_1 = require("./helpers/users");
const PORT = process.env.PORT || 7000;
const app = express();
//app.use(cors());
const httpServer = http.createServer(app);
const io = new socket_io_1.Server(httpServer, {
    allowEIO3: true,
    cors: {
        origin: ["http://localhost:3000", "http://localhost:3000/chat"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});
io.on("connection", (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = users_1.chatHelper.addUser({ id: socket.id, name, room });
        if (error)
            return callback(error);
        socket.join(user.room);
        socket.emit('message', { user: 'admin', text: `${user.name}, Welcome the room ${user.room}` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined` });
        io.to(user.room).emit('roomData', { room: user.room, users: users_1.chatHelper.getUsersInRoom(user.room) });
        callback();
    });
    socket.on('sendMessage', (message, callback) => {
        const user = users_1.chatHelper.getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message });
        callback();
    });
    socket.on('disconnect', () => {
        const user = users_1.chatHelper.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: users_1.chatHelper.getUsersInRoom(user.room) });
        }
    });
});
// Routes
app.use(router_1.default);
httpServer.listen(PORT, () => console.log(`Server has started on Port: ${PORT}`));
