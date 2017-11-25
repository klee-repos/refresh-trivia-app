//Socket.io
import SocketIOClient from 'socket.io-client';

var socket;

if (window.location.hostname === 'localhost') {
    socket = SocketIOClient('http://localhost:8080');
} else {
    socket = SocketIOClient(window.location.hostname);
}


export default socket;