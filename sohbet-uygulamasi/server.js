const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(3000);

app.use(express.static('public'));

const io = socket(server);

let users = {}; 

io.on('connection', (socket) => {
    console.log('Yeni bir kullanıcı bağlandı:', socket.id);

    
    socket.on('join', (username) => {
        users[socket.id] = username;
        io.emit('userList', Object.values(users));
    });

    
    socket.on('chat', (data) => {
        io.emit('chat', data);
    });

    
    socket.on('disconnect', () => {
        delete users[socket.id];
        io.emit('userList', Object.values(users));
    });
});
