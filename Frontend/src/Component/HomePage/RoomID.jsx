import React from 'react'
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid'; // Ensure you have installed nanoid
import { useParams } from 'react-router-dom';

const RoomID = () => {
    const params = useParams();
    const navigate = useNavigate();

    const handleCreateRoom = () => {
        const roomID = nanoid(6); // Generate a 6-character room ID
        navigate('/waiting', { state: { roomID } }); // Pass roomID to the waiting screen
    };


    return (
        <>
            <div className="createID">
                <div className="idLabel">Room ID : </div>
                <div className="generatedGameID">{params.roomID}</div>
                <img src="copy.png"></img>
            </div>
        </>

    )
}

export default RoomID