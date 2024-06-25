const socket = io.connect('http://localhost:3000');
const sender = document.getElementById('sender');
const message = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');
const userList = document.getElementById('user-list');


submitBtn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        sender: sender.value
    });
    message.value = '';
});


socket.on('chat', (data) => {
    output.innerHTML += '<p><strong>' + data.sender + ': </strong>' + data.message + '</p>';
});


socket.on('userList', (users) => {
    userList.innerHTML = ''; 
    users.forEach((user) => {
        userList.innerHTML += '<p>' + user + '</p>'; 
    });
});


window.onload = () => {
    const username = prompt('Adınızı girin:');
    socket.emit('join', username);
};
