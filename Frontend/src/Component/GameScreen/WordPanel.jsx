import React, { useState, useEffect, useRef } from "react";
import "./WordPanel.css";

const NUM_Y_POSITIONS = 6;

const WordPanel = ({ showCountdown, onUpdateWords, currentInput, focusedWord }) => {
    const [words, setWords] = useState([]);
    const [highlightedWord, setHighlightedWord] = useState(null);
    const wordsList = useRef([]);
    const usedWords = useRef(new Set());
    const lastYPos = useRef(null);

    const yPositions = Array.from(
        { length: NUM_Y_POSITIONS },
        (_, i) => (i + 1) * (80 / NUM_Y_POSITIONS - 2)
    );

    const fetchRandomWords = async () => {
        try {
            const response = await fetch(
                "https://random-word-api.herokuapp.com/word?number=10"
            );
            const data = await response.json();
            const filteredWords = data.filter((word) => word.length <= 10);
            wordsList.current = [...wordsList.current, ...filteredWords];
        } catch (error) {
            console.error("Error fetching words:", error);
        }
    };

    const getUniqueWord = () => {
        if (wordsList.current.length === 0) {
            fetchRandomWords();
            return null;
        }

        let randomWord = null;
        while (randomWord === null || usedWords.current.has(randomWord)) {
            if (wordsList.current.length === 0) {
                return null;
            }
            randomWord =
                wordsList.current[Math.floor(Math.random() * wordsList.current.length)];
        }

        usedWords.current.add(randomWord);
        wordsList.current = wordsList.current.filter((word) => word !== randomWord);
        return randomWord;
    };

    const getRandomYPosition = () => {
        let newYPos;
        do {
            newYPos = yPositions[Math.floor(Math.random() * yPositions.length)];
        } while (newYPos === lastYPos.current);

        lastYPos.current = newYPos;
        return newYPos;
    };

    useEffect(() => {
        if (!showCountdown) {
            fetchRandomWords();

            const wordInterval = setInterval(() => {
                let randomWord = getUniqueWord();
                if (!randomWord) return;

                let randomY = getRandomYPosition();

                setWords((prevWords) => [
                    ...prevWords,
                    {
                        text: randomWord,
                        id: Date.now(),
                        yPos: randomY,
                        xPos: 100,
                        visible: true,
                    },
                ]);
            }, 1800);

            return () => clearInterval(wordInterval);
        }
    }, [showCountdown]);

    useEffect(() => {
        if (showCountdown) return;

        let animationFrameId;

        const moveWords = () => {
            setWords((prevWords) =>
                prevWords.map((word) => ({
                    ...word,
                    xPos: word.xPos - 0.1899,
                    visible: word.xPos > 0,
                }))
            );

            animationFrameId = requestAnimationFrame(moveWords);
        };

        animationFrameId = requestAnimationFrame(moveWords);

        return () => cancelAnimationFrame(animationFrameId);
    }, [words, showCountdown]);

    useEffect(() => {
        onUpdateWords(words);
    }, [words, onUpdateWords]);

    useEffect(() => {
        if (focusedWord && currentInput === focusedWord.text) {
            setHighlightedWord(focusedWord);
            const timer = setTimeout(() => {
                setHighlightedWord(null); 
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [currentInput, focusedWord]);

    return (
        <div className="wordPanel">
            {words.map((word) => (
                <div
                    key={word.id}
                    className={`word ${word.visible ? "" : "invisible"}`}
                    style={{ top: `${word.yPos}%`, left: `${word.xPos}%` }}
                >
                    <p>
                        {word.text.split("").map((char, index) => {
                            const isCharTyped = focusedWord && focusedWord.id === word.id && index < currentInput.length;
                            const isCharMatch = isCharTyped && char === currentInput[index];
                            const isLastChar = focusedWord && focusedWord.id === word.id && index === currentInput.length - 1;
                            const isHighlighted = isCharMatch || (isLastChar && highlightedWord === focusedWord);

                            return (
                                <span
                                    key={index}
                                    style={{
                                        color: isHighlighted ? "green" : "black",
                                        fontWeight: isHighlighted ? "bold" : "600",
                                    }}
                                >
                                    {char}
                                </span>
                            );
                        })}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default WordPanel;
