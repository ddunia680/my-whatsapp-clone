const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const User = require('./models/user');
require('dotenv').config();
const path = require('path');

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const messagesRoutes = require('./routes/messages');

const app = express();

const fileFilter = (req, file, cb) => {
    if(
        file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpeg' || 
        file.mimetype === 'image/jpg' ||
        file.options.mimeType === 'audio/webm;codecs=opus'
    ) {
        cb(null, true);
    } else {
        cb(null, false)
    }
}

app.use(cors({
    origin: process.env.SOCKET_ORIGIN,
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization'
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(multer({fileFilter: fileFilter}).single('image'));

app.use('/auth', authRoutes);
app.use('/list', usersRoutes);
app.use(messagesRoutes);
app.use('/', (req, res) => {
    res.send('welcome to the server');
})

// console.log(process.env.CONNECT_STRING);
mongoose.connect(process.env.CONNECT_STRING)
.then(res => {
    const PORT = process.env.PORT || 8080
    const server = app.listen(PORT, () => {
        console.log('server is on');
    });
    const io = require('./socket').init(server);
    io.on('connection', socket => {
        let user_identification;
        console.log(`Client ${socket.id} is connected`);

        socket.on('setup', (user_id) => {
            user_identification = user_id
            console.log(`User ${socket.id} initially joined room ${user_id}`);
            socket.join(user_id);
            User.findById(user_id)
            .then(user => {
                user.lastSeen = 'online';
                return user.save();
            })
            .then(result => {
                console.log('');
            })
            socket.to(user_id).emit('isOnline', true);
        })

        socket.on('joint_chat', room => {
            socket.join(room);
            console.log('User ' + socket.id + ' joined room ' + room);
            socket.to(room).emit('isOnline', true);
        }); 

        socket.on('disconnect', () => {
            console.log(user_identification);
            console.log(`User ${socket.id} disconnected`);
            if(user_identification) {
                const date = Date.now();
                User.findById(user_identification)
                .then(user => {
                    user.lastSeen = new Date();
                    return user.save();
                })
                .then(result => {
                    console.log('');
                })
            }
            
        })
    });
});