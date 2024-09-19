import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import socket from '../../socket';

const CreateRoom = ({ initialTime, setDifficulty }) => {

    const location = useLocation();
    const roomId = location.state?.roomId || 'No Room ID';

    // console.log(RoomId)

    const navigate = useNavigate();

    const handleCreateClick = () => {

        

        navigate(`/${roomId}/in-queue`, {
            state: {
                initialTime,
                setDifficulty,
                roomId,
            }
        });

    };

    return (
        <button className="Play" onClick={handleCreateClick} style={{ fontSize: '3vh' }}>
            CREATE
        </button >
    );
};

export default CreateRoom;