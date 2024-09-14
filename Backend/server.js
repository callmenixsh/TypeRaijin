// server.js - Backend logic
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 4000;

// Store room data with player details
const rooms = {};

// Function to generate a unique room ID
const generateRoomID = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 6 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
};

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle room creation when the first player joins
    socket.on('createRoom', ({ playerInfo }, callback) => {
        const roomId = generateRoomID();
        console.log(`Generated Room ID is: ${roomId}`);

        rooms[roomId] = {
            players: [{ id: socket.id, name: playerInfo.name, ready: false }],
            readyCount: 0,
        };

        socket.join(roomId);
        callback({ roomId }); // Send the room ID back to the frontend
        console.log(`Room ${roomId} created by ${playerInfo.name}`);
    });

    // Handle joining a room
    socket.on('joinRoom', ({ roomId, username }, callback) => {
        if (rooms[roomId]) {
            socket.join(roomId);
            rooms[roomId].players.push({ id: socket.id, name: username, ready: false });
            callback({ success: true });
            console.log(`${username} joined room ${roomId}`);
        } else {
            callback({ success: false, message: 'Room does not exist' });
        }
    });

    // Handle player disconnection
    socket.on('disconnect', () => {
        console.log('User Disconnected:', socket.id);

        // Remove player from rooms
        for (const roomId in rooms) {
            const room = rooms[roomId];
            const playerIndex = room.players.findIndex(player => player.id === socket.id);
            if (playerIndex !== -1) {
                room.players.splice(playerIndex, 1);
                if (room.players.length === 0) {
                    delete rooms[roomId];
                }
            }
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
