import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateRoom = ({ initialTime, setDifficulty, roomID }) => {
    const navigate = useNavigate();

    const handlePlayClick = () => {
        // Emit an event to create or join the room
        socket.emit('createRoom', roomID);

        // Handle server response to ensure the room is created
        socket.once('roomCreated', () => {
            // Navigate to the waiting screen with the room ID
            navigate('/in-queue', {
                state: {
                    initialTime,
                    setDifficulty,
                    roomID // Pass room ID to the waiting screen
                }
            });
        });
    };

    return (
        <button className="Play" onClick={handlePlayClick} style={{ fontSize: '3vh' }}>
            CREATE ROOM
        </button >
    );
};

export default CreateRoom;
