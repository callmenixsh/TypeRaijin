import React, { useEffect } from 'react';
import './QuitConfirm.css';
import { useNavigate, useLocation } from 'react-router-dom';
import socket from '../../socket';


const QuitConfirm = () => {
    const location = useLocation();
    const roomId = location.state?.roomId || "EasterEgg";
    const username = location.state?.username || "Anonymous";
    console.log(username)
    const navigate = useNavigate();

    const onConfirm = () => {
        handleQuitGame();
    };

    const onCancel = () => {
        navigate(`/${roomId}`);
    };

    const handleQuitGame = () => {
        console.log(`Sending quitGame with roomId: ${roomId}, username: ${username}`);
        socket.emit('quitGame', { roomId, username });
        
        navigate('/');
    };

    return (
        <div className="overlay">
            <div className="modal">
                <p>YOU WANNA QUIT FOSHO?</p>
            </div>
            <div className="buttonGroup">
                <button className="confirmButton" onClick={onConfirm}>YESSIR</button>
                <button className="cancelButton" onClick={onCancel}>NOSIR</button>
            </div>
        </div>
    );
};

export default QuitConfirm;
