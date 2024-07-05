import express from 'express';
import { createServer } from 'node:http';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server,{
    cors: {
        origin: "http://localhost:8000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('client-message', (data) => {
        console.log('Message: ' + JSON.stringify(data));
        
        const {event, message} = data;
        io.emit(event, message);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});