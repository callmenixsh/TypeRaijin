import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GameScreen.css';
import Quits from '../Sub-component/Quit';
import Leaderboard from '../Sub-component/Leaderboard';
import CountdownOverlay from './CountdownOverlay';
import WordPanel from './WordPanel';

const GameScreen = ({ initialTime = 2 }) => {
    const [showCountdown, setShowCountdown] = useState(true);
    const [timeLeft, setTimeLeft] = useState(initialTime * 60); // Initialize time in seconds
    const navigate = useNavigate();

    const handleCountdownComplete = () => {
        setShowCountdown(false);
    };

    useEffect(() => {
        if (showCountdown) return;

        if (timeLeft > 0) {
            const timerId = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => clearTimeout(timerId); // Cleanup the timeout on unmount or update
        } else {
            navigate('/result'); // Redirect to the result page when time runs out
        }
    }, [timeLeft, showCountdown, navigate]);

    // Format timeLeft to MM:SS format
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="boddy">
            {showCountdown && <CountdownOverlay onComplete={handleCountdownComplete} />}
            <div className={`gameUI ${showCountdown ? 'blur' : ''}`}>
                <div className="tabList">
                    <div className="titleBar"><img src="logo.png" alt="logo" />TypeRAIJIN</div>
                    <div className="timer">{formatTime(timeLeft)}</div> {/* Display timer in MM:SS format */}
                    <Leaderboard />
                </div>
                <WordPanel showCountdown={showCountdown} />
            </div>
            <input className="typingPanel" spellCheck="false" maxLength="10" />
            <div className="menuBar">
                <Quits />
            </div>
        </div>
    );
};

export default GameScreen;
