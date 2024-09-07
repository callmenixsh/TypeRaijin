import React from 'react'
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid'; // Ensure you have installed nanoid
import { useParams } from 'react-router-dom';
import copyIcon from '../../assets/copy.png'

const RoomID = () => {
    const params = useParams();
    const navigate = useNavigate();

    const handleCreateRoom = () => {
        const roomID = nanoid(6);
        navigate('/waiting', { state: { roomID } });
    };


    return (
        <>
            <div className="createID">
                <div className="idLabel">Room ID : </div>
                <div className="generatedGameID">{params.roomID}</div>
                <img src={copyIcon} ></img>
            </div>
        </>

    )
}

export default RoomID