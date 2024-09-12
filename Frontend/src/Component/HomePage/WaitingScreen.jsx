import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RoomID from './RoomID';
import './Homescreen.css';
import '../Sub-component/Subcomps.css';
import BackButton from '../Sub-component/BackButton.jsx';

const WaitingScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const username = location.state?.username || "Guest";
    const roomID = location.state?.roomID || ""; // Room ID passed from previous screen

    const [players, setPlayers] = useState([username]);
    const [readyStatus, setReadyStatus] = useState(false);

    useEffect(() => {
        // Join the room when component mounts
        socket.emit('joinRoom', { roomId: roomID, playerInfo: { name: username } });

        // Update players list when a new player joins
        socket.on('playerJoined', (data) => {
            setPlayers((prevPlayers) => [...prevPlayers, data.playerInfo.name]);
        });

        // Start the game when the server sends the gameStarted event
        socket.on('gameStarted', () => {
            navigate("/gamescreen", {
                state: {
                    initialTime: location.state.initialTime,
                    setDifficulty: location.state.setDifficulty
                }
            });
        });

        // Cleanup event listeners on component unmount
        return () => {
            socket.off('playerJoined');
            socket.off('gameStarted');
        };
    }, [navigate, roomID, username, location.state]);

    const handleReady = () => {
        setReadyStatus(true);
        socket.emit('playerReady', roomID); // Notify server player is ready
    };

    return (
        <div className="Wait-Body">
            <div className='waitMsg'>
                <h1>Waiting for players...</h1>
                {players.length < 2 && <p>At least 2 players are required to start the game.</p>}
            </div>
            <div className='wait-status'>
                <div className="playerList">
                    {players.map((player, index) => (
                        <div key={index} className={`player${index + 1} playerS`}>{player}</div>
                    ))}
                    {players.length < 4 &&
                        Array.from({ length: 4 - players.length }).map((_, i) => (
                            <div key={players.length + i} className={`player${players.length + i + 1} playerS`}>Waiting...</div>
                        ))}
                </div>
                <div className='roomNready'>
                    <RoomID />
                    <div className='playNback'>
                        <button
                            className="readyButton"
                            onClick={handleReady}
                            disabled={readyStatus}
                        >
                            {readyStatus ? 'Waiting for others...' : 'Ready'}
                        </button>
                        <BackButton />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WaitingScreen;
