import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const JoinRoom = ({ initialTime, setDifficulty }) => {

    const location = useLocation();
    const roomId = location.state?.roomId || 'No Room ID';

    const navigate = useNavigate();

    const handleJoinClick = () => {
        navigate(`/${roomId}/in-queue`, {
            state: {
                initialTime,
                setDifficulty,
                roomId,
            }
        });
    };


    return (
        <button className="Play" onClick={handleJoinClick} style={{ fontSize: '3vh' }}>
            JOIN
        </button>
    );
};

export default JoinRoom;
