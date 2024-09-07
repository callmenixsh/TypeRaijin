const express = require('express');
const { customAlphabet } = require('nanoid');
const app = express();

const generateRoomID = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);

const rooms = new Set();

app.post('/create-room', (req, res) => {
    let roomID;

    do {
        roomID = generateRoomID();
    } while (rooms.has(roomID));

    rooms.add(roomID);

    res.json({ roomID });
});

app.listen(5173, () => console.log('Server is running on port 5173'));
