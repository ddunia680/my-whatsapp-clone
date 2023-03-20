import io from 'socket.io-client';

let socket;

export default class openSocket {
    static init = (ENDPOINT) => {
        socket = io(ENDPOINT);
        return socket;
    };

    static getIO = () => {
        if(!socket) {
            // throw new Error('Socket.io not initilalized');
            console.log('socket is not intialized');
        }
        return socket;
    }
}
