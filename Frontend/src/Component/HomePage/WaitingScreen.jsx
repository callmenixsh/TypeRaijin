import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RoomID from './RoomID';
import './Homescreen.css';
import '../Sub-component/Subcomps.css';
// import BackButton from '../Sub-component/BackButton.jsx';
import socket from "../../socket";
import backIcon from '../../assets/back.png'


const WaitingScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const roomId = location.state?.roomId;
    const [username, setUsername] = useState("");
    const [players, setPlayers] = useState([]);
    const [readyStatus, setReadyStatus] = useState(false);
    const [joined, setJoined] = useState(false);

    // Load username from localStorage
    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    // Join room and listen for updates
    // useEffect(() => {
    if (username && roomId && !joined) {
        // Emit event to join room
        socket.emit('joinRoom', { roomId, username }, (response) => {
            if (response.success) {
                setPlayers(response.players);
                setJoined(true);
            }
        });

        // Listen for other players joining
        socket.on('playerJoined', (data) => {
            setPlayers(data.players);
        });

        // Listen for updates when a player marks ready
        socket.on('playerReadyStatus', (data) => {
            setPlayers(data.players);
        });

        // Listen for game start signal
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
    }
    // }, [username, roomId, joined, navigate, location.state]);

    // Handle leaving the room
    const handleLeaveRoom = () => {
        // if (roomId && username) {
        // Emit event to leave the room

        socket.emit('leaveRoom', { roomId, username });

        navigate(-1); // Go back to the previous page
        // }
        socket.on('playerJoined', (data) => {
            setPlayers(data.players);
        });
    };

    // Handle ready status
    const handleReady = () => {
        setReadyStatus(true);
        socket.emit('playerReady', { roomId, playerName: username });
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
                                Waiting for player...
                            </div>
                        ))}
                </div>
                <div className='roomNready'>
                    <RoomID roomID={roomId} />
                    <div className='playNback'>
                        <button
                            className="readyButton"
                            onClick={handleReady}
                            disabled={readyStatus}
                        >
                            {readyStatus ? 'Waiting for others...' : 'Ready'}
                        </button>
                        {/* Back button sends the player out of the room */}

                        <div className="prevPageButton"
                            onClick={handleLeaveRoom}>
                            <img src={backIcon} alt="Back Icon" />

                        </div>
                        {/* <button

                        >
                            Back
                        </button> */}
                        {/* <BackButton onClick={handleLeaveRoom} /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WaitingScreen;
