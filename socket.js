let io;
require('dotenv').config();
// https://my-whatsapp-clone.vercel.app
module.exports = {
    init: httpServer => {
        io = require('socket.io')(httpServer, {
            pingTimeout: 60000,
            cors: {
                origin: process.env.SOCKET_ORIGIN
            }
        });
        return io;
    },
    getIO: () => {
        if(!io) {
            throw new Error('Socket.io not initialized!');
        }
        return io;
    }
}