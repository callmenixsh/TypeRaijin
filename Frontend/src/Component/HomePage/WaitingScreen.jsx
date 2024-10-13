import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RoomID from './RoomID';
import './HomeScreen.css';
import '../Sub-component/Subcomps.css';
// import BackButton from '../Sub-component/BackButton.jsx';
import socket from "../../socket";
import backIcon from '../../assets/back.png'
import { motion } from 'framer-motion';
import Guide from "../Sub-component/guide";

const WaitingScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const roomId = location.state?.roomId;
    const [username, setUsername] = useState("");
    const [players, setPlayers] = useState([]);
    const [readyStatus, setReadyStatus] = useState(false);
    const [joined, setJoined] = useState(false);

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);


    // useEffect(() => {
    if (username && roomId && !joined) {
        socket.emit('joinRoom', { roomId, username }, (response) => {
            if (response.success) {
                setPlayers(response.players);
                setJoined(true);
            }
        });

        socket.on('playerJoined', (data) => {
            setPlayers(data.players);
        });

        socket.on('playerReadyStatus', (data) => {
            setPlayers(data.players);
        });

        socket.on('gameStarted', () => {
            navigate(`/game/${roomId}`, {
                state: {
                    roomId: roomId,
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

    const handleLeaveRoom = () => {
        // if (roomId && username) {

        socket.emit('leaveRoom', { roomId, username });

        navigate('/');
        // }
        socket.on('playerJoined', (data) => {
            setPlayers(data.players);
        });
    };

    const handleReady = () => {
        setReadyStatus(true);
        socket.emit('playerReady', { roomId, playerName: username });
    };




    return (
        <div className="Wait-Body">
            <Guide/>
            <div className='waitMsg'>
                <h1>
                    {Array.from("Waiting for players...").map((char, index) => (
                        <motion.span key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }}>
                            {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                    ))}
                </h1>
                {/* {players.length < 2 && <p>At least 2 players are required to start the game.</p>} */}
            </div>
            <div className='wait-status'>
                <div className="playerList">
                    {players.map((player, index) => (
                        <motion.div
                            key={index}
                            className={`player${index + 1} playerS ${player.ready ? 'ready' : ''}`}
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {player.name} {player.ready && '✔'}
                        </motion.div>
                    ))}
                    {players.length < 4 &&
                        Array.from({ length: 4 - players.length }).map((_, i) => (
                            <motion.div
                                key={players.length + i}
                                className={`player${players.length + i + 1} playerS`}
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: (players.length + i) * 0.1 }}
                            >
                                Waiting for player...
                            </motion.div>
                        ))}
                </div>
                <div className='roomNready'>
                    <RoomID roomID={roomId}
                        motionProps={{
                            initial: { scale: 0, opacity: 0 },
                            animate: { scale: 1, opacity: 1 },
                            transition: { type: 'spring', stiffness: 300, damping: 27, delay: 0.2 },
                        }}
                    />
                    <div className='playNback'>
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.3 }}
                            whileTap={{ scale: 0.9 }}
                            className="readyButton"
                            onClick={handleReady}
                            disabled={readyStatus}
                        >
                            {readyStatus ? 'Waiting for others...' : 'Ready'}
                        </motion.button>
                        {/* Back button sends the player out of the room */}

                        <motion.div className="prevPageButton"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.4 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleLeaveRoom}>
                            <img src={backIcon} alt="Back Icon" />

                        </motion.div>
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
