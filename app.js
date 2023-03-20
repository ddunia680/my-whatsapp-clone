const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const messagesRoutes = require('./routes/messages');

const app = express();

const fileFilter = (req, file, cb) => {
    if(
        file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpeg' || 
        file.mimetype === 'image/jpg'
    ) {
        cb(null, true);
    } else {
        cb(null, false)
    }
}

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization'
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(multer({fileFilter: fileFilter}).single('image'));

app.use('/auth', authRoutes);
app.use('/list', usersRoutes);
app.use(messagesRoutes);


// console.log(process.env.CONNECT_STRING);
mongoose.connect(process.env.CONNECT_STRING)
.then(res => {
    const server = app.listen(8080, () => {
        console.log('server is on');
    });
    const io = require('./socket').init(server);
    io.on('connection', socket => {
        console.log(`Client ${socket.id} is connected`);
        // console.log();

        socket.on('setup', (user_id) => {
            console.log(`User ${socket.id} initially joined room ${user_id}`);
            socket.join(user_id);
            // socket.emit("connected");
        })

        socket.on('joint_chat', room => {
            socket.join(room);
            console.log('User ' + socket.id + 'joined room ' + room);
        }); 

        socket.on('disconnect', () => {
            console.log(`User ${socket.id} disconnected`);
        })
    });
});