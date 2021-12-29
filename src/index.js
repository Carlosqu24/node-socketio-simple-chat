const express = require('express');
const app = express();

const path = require('path');
const SocketIO = require('socket.io');


// ROUTES
app.use('/', require('./routes/index.routes'));


// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));


const server = app.listen(3000, () => {
      console.log("http://localhost:3000");
});


// WEB SOCKETS
const io = SocketIO(server);

io.on('connection', (socket) => {
      console.log("New Connection", socket.id);

      socket.on('chat:message', (message) => {
            io.sockets.emit('chat:message', message) 
      });

      socket.on('chat:typing', (username) => {
            socket.broadcast.emit('chat:typing', username)
      })
});