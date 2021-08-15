const app = require('express')();
const httpServer = require('http').createServer(app);
const options = {
    cors: {
        origin: '*',
    },
};
const io = require('socket.io')(httpServer, options);

io.on('connection', (socket) => {
    console.log('connected to a server');
    socket.on('send', (blockchain) => {
        socket.broadcast.emit('addBlockchain', JSON.stringify(blockchain));
    });
    socket.on('pending', (pending) => {
        socket.broadcast.emit('pending', JSON.stringify(pending));
    });
});

httpServer.listen(3000, () => console.log('listening'));