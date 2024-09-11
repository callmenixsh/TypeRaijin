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
    const initialTime = location.state?.initialTime;
    
    const setDifficulty = location.state?.setDifficulty;
    const [players, setPlayers] = useState([username, "Red", "Purple", "Green"]);

    const handleReady = () => {
        navigate("/gamescreen", {
            state: {
                initialTime: initialTime,
                setDifficulty: setDifficulty
            }
        });
        
        console.log(setDifficulty);
        console.log(initialTime);
    };
    return (
        <>
            <div className="Wait-Body">
                <div className='waitMsg'>
                    <h1>Waiting for players...</h1>
                </div>
                <div className='wait-status'>
                    <div className="playerList">
                        <div className="player1 playerS">{players[0]}</div>
                        <div className="player2 playerS">{players[1]}</div>
                        <div className="player3 playerS">{players[2]}</div>
                        <div className="player4 playerS">{players[3]}</div>
                    </div>
                    <div className='roomNready'>
                        <RoomID />
                        <div className='playNback'>
                            <button className="readyButton" onClick={handleReady}>Ready</button>
                            <BackButton />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WaitingScreen;
