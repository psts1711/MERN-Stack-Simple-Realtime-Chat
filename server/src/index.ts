import * as express from 'express';
import {Server, Socket} from 'socket.io';
import * as http from 'http'
import router from './router/router';
import { chatHelper } from './helpers/users'
import * as cors from 'cors';


const PORT = process.env.PORT || 7000;

const app = express();
//app.use(cors());

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  allowEIO3: true ,
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3000/chat"],
    allowedHeaders: ["my-custom-header"],
    
    credentials: true
  }
});


io.on("connection", (socket) => {

  socket.on('join', ({name, room}, callback)=>{

    const {error, user } = chatHelper.addUser({id: socket.id, name, room});
    
    if(error) return callback(error)
    socket.join(user.room)
    socket.emit('message', {user:'admin', text:`${user.name}, Welcome the room ${user.room}`});
    socket.broadcast.to(user.room).emit('message', {user:'admin', text:`${user.name}, has joined`});
    io.to(user.room).emit('roomData', { room: user.room, users: chatHelper.getUsersInRoom(user.room) });

    callback();

    
  });

  socket.on('sendMessage', (message, callback)=>{
    const user = chatHelper.getUser(socket.id);
    io.to(user.room).emit('message', {user:user.name, text: message})
    callback();
  })


  socket.on('disconnect', () => {
    const user = chatHelper.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: chatHelper.getUsersInRoom(user.room)});
    }
  })

});


// Routes
app.use( router);


httpServer.listen(PORT, ()=>console.log(`Server has started on Port: ${PORT}`))