import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GameScreen.css';
import Quits from '../Sub-component/Quit';
import Leaderboard from '../Sub-component/Leaderboard';
import CountdownOverlay from './CountdownOverlay';
import WordPanel from './WordPanel';
import logoIcon from '../../assets/logo.png';

const GameScreen = ({ initialTime = 10 }) => {
    const [showCountdown, setShowCountdown] = useState(true);
    const [timeLeft, setTimeLeft] = useState(initialTime * 60);
    const [currentInput, setCurrentInput] = useState('');
    const [currentWords, setCurrentWords] = useState([]);
    const [focusedWord, setFocusedWord] = useState(null);
    const navigate = useNavigate();

    const handleCountdownComplete = () => {
        setShowCountdown(false);
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;

        if (inputValue.length <= currentInput.length) {
            return;
        }

        const matchingWord = currentWords.find(
            (word) => word.text.startsWith(inputValue) && word.visible
        );

        if (matchingWord) {
            setCurrentInput(inputValue);
            setFocusedWord(matchingWord);

            if (inputValue === matchingWord.text) {
                setCurrentWords((prevWords) =>
                    prevWords.map((word) =>
                        word.id === matchingWord.id ? { ...word, visible: false } : word
                    )
                );
                setFocusedWord(null);
                setCurrentInput('');
            }
        }
    };

    const handleUpdateWords = (words) => {
        setCurrentWords(words);

        if (focusedWord) {
            const wordStillVisible = words.some(
                (word) => word.id === focusedWord.id && word.visible
            );
            if (!wordStillVisible) {
                setFocusedWord(null);
                setCurrentInput('');
            }
        }
    };

    useEffect(() => {
        if (showCountdown) return;

        if (timeLeft > 0) {
            const timerId = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => clearTimeout(timerId);
        } else {
            navigate('/result');
        }
    }, [timeLeft, showCountdown, navigate]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="boddy">
            {showCountdown && <CountdownOverlay onComplete={handleCountdownComplete} />}
            <div className={`gameUI ${showCountdown ? 'blur' : ''}`}>
                <WordPanel
                    showCountdown={showCountdown}
                    onUpdateWords={handleUpdateWords}
                    currentInput={currentInput}
                    focusedWord={focusedWord}
                />
                <div className="tabList">
                    <div className="titleBar">
                        <img src={logoIcon} alt="logo" />TypeRAIJIN
                    </div>
                    <div className="timer">{formatTime(timeLeft)}</div>
                    <Leaderboard />
                </div>
            </div>
            <input
                className="typingPanel"
                spellCheck="false"
                maxLength="10"
                value={currentInput}
                onChange={handleInputChange}
            />
            <div className="menuBar">
                <Quits />
            </div>
        </div>
    );
};

export default GameScreen;
