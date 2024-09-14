import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RoomID from './RoomID';
import './Homescreen.css';
import '../Sub-component/Subcomps.css';
import BackButton from '../Sub-component/BackButton.jsx';
import socket from "../../socket";

const WaitingScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const username = location.state?.username || "Guest";
    const roomId = location.state?.roomId;
    console.log(roomId)

    const [players, setPlayers] = useState([{ name: username, ready: false }]);
    const [readyStatus, setReadyStatus] = useState(false);

    console.log(roomId);

    useEffect(() => {
        // Join the room with the current player info
        socket.emit('joinRoom', { roomId: roomId, playerInfo: { name: username } });

        // Listen for new players joining
        socket.on('playerJoined', (data) => {
            setPlayers((prevPlayers) => [...prevPlayers, { name: data.playerInfo.name, ready: false }]);
        });

        // Listen for updates when a player marks as ready
        socket.on('playerReadyStatus', (data) => {
            setPlayers((prevPlayers) =>
                prevPlayers.map((player) =>
                    player.name === data.playerName ? { ...player, ready: true } : player
                )
            );
        });

        // Start the game when all players are ready
        socket.on('gameStarted', () => {
            navigate("/gamescreen", {
                state: {
                    initialTime: location.state.initialTime,
                    setDifficulty: location.state.setDifficulty,
                }
            });
        });

        return () => {
            socket.off('playerJoined');
            socket.off('playerReadyStatus');
            socket.off('gameStarted');
        };
    }, [navigate, roomId, username, location.state]);

    // Handle the ready button click
    const handleReady = () => {
        setReadyStatus(true);
        socket.emit('playerReady', { roomId: roomId, playerName: username });
    };

    // Check if all players are ready to start the game
    useEffect(() => {
        if (players.length > 1 && players.every((player) => player.ready)) {
            socket.emit('startGame', roomId); // Notify the server to start the game
        }
    }, [players, roomId]);

    return (
        <div className="Wait-Body">
            <div className='waitMsg'>
                <h1>Waiting for players...</h1>
                {players.length < 2 && <p>At least 2 players are required to start the game.</p>}
            </div>
            <div className='wait-status'>
                <div className="playerList">
                    {players.map((player, index) => (
                        <div
                            key={index}
                            className={`player${index + 1} playerS ${player.ready ? 'ready' : ''}`}
                        >
                            {player.name} {player.ready && '✔️'}
                        </div>
                    ))}
                    {players.length < 4 &&
                        Array.from({ length: 4 - players.length }).map((_, i) => (
                            <div key={players.length + i} className={`player${players.length + i + 1} playerS`}>
                                Waiting...
                            </div>
                        ))}
                </div>
                <div className='roomNready'>
                    <RoomID
                        roomID={roomId}
                    />
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
