const express = require('express');
const { nanoid } = require('nanoid');
const app = express();

app.post('/create-room', (req, res) => {
    const roomID = nanoid(6); // Generates a 6-character unique ID
    // Store roomID in the database or server memory if needed
    res.json({ roomID });
});

app.listen(3000, () => console.log('Server running on port 3000'));
