const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const port = 5000;
const app = express();
const db = require('./model/index');
const cors = require('cors');
const bodyParser = require('body-parser');
const httpServer = createServer(app);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
db.sequelize.sync({ alter: true });

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
    },
});

io.on('connection', (socket) => {
    socket.on('online', ({ usernameOnline }) => {
        socket.join(usernameOnline);
        console.log('Online: ', usernameOnline);
        socket.on('send-message', ({ targetUser, message, sender }) => {
            socket.join(targetUser);
            console.log('Join room ', targetUser, ' send message: ', message);
            socket.to(targetUser).emit('recieved-message', { sender: sender, message: message });
            socket.leave(targetUser);
        });

        socket.on('send-friend-request', ({ targetUser, usernameSender, nameSender, avtFilePathSender, friendId }) => {
            socket.join(targetUser);
            console.log('Join room ', targetUser, ' send friend request: ', usernameSender);
            socket.to(targetUser).emit('recieved-friend-request', {
                usernameSender: usernameSender,
                nameSender: nameSender,
                avtFilePathSender: avtFilePathSender,
                friendId: friendId,
            });
            socket.leave(targetUser);
        });
    });
});

require('./controller/user.controller')(app);
require('./controller/friend.controller')(app);

httpServer.listen(port, () => {
    console.log('Listen on port ', port);
});
