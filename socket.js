let io;
// https://my-whatsapp-clone.vercel.app
module.exports = {
    init: httpServer => {
        io = require('socket.io')(httpServer, {
            pingTimeout: 60000,
            cors: {
                origin: 'https://my-whatsapp-clone.vercel.app'
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