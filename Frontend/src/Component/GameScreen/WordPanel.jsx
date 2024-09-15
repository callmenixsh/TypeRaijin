import React, { useState, useEffect, useRef } from "react";
import "./WordPanel.css";
import socket from "../../socket";

const WordPanel = ({ showCountdown, onUpdateWords, currentInput, focusedWord, gameDifficulty, roomID }) => {
    const [words, setWords] = useState([]); // List of words currently on screen
    const [highlightedWord, setHighlightedWord] = useState(null); // Tracks the highlighted word for typing
    const lastYPos = useRef(null); // Keeps track of the last Y position to avoid overlapping
    const usedWords = useRef(new Set()); // Tracks used words to ensure uniqueness
    const wordsList = useRef([]); // List of words available for spawning
    const wordIndex = useRef(0); // Index to keep track of the next word to display

    // Emit the 'gamestart' event to server with the roomId
    useEffect(() => {
        if (roomID) {
            socket.emit("gamestart", { roomId: roomID });
        }
    }, [roomID]);

    // Listen for words sent by the server
    useEffect(() => {
        const handleSendWords = ({ words }) => {
            console.log("Words received:", words);
            wordsList.current = words; // Store received words for future use
        };

        socket.on("sendWords", handleSendWords);

        return () => {
            socket.off("sendWords", handleSendWords); // Cleanup listener
        };
    }, []);

    // Error handling and additional socket listeners
    useEffect(() => {
        socket.on("receiveWord", ({ word }) => {
            console.log("Received a unique word:", word);
        });

        socket.on("noMoreWords", () => {
            console.log("No more unique words available.");
        });

        return () => {
            socket.off("receiveWord");
            socket.off("noMoreWords");
        };
    }, []);

    // Handle countdown and word spawning
    useEffect(() => {
        if (!showCountdown) {
            const wordInterval = setInterval(() => {
                const nextWord = getNextWord(); // Get the next word in order
                if (!nextWord) return;

                const randomY = getRandomYPosition(); // Get random Y position

                // Add new word to the list
                setWords((prevWords) => [
                    ...prevWords,
                    {
                        text: nextWord,
                        id: Date.now(),
                        yPos: randomY,
                        xPos: 100, // Start at the right side of the screen
                        visible: true,
                    },
                ]);
            }, gameDifficulty); // Difficulty controls the speed of spawning words

            return () => clearInterval(wordInterval); // Cleanup the interval
        }
    }, [showCountdown, gameDifficulty]);

    // Move words from right to left
    useEffect(() => {
        if (showCountdown) return;

        let animationFrameId;

        const moveWords = () => {
            setWords((prevWords) =>
                prevWords.map((word) => ({
                    ...word,
                    xPos: word.xPos - 0.1899, // Move the word to the left
                    visible: word.xPos > 0, // Only keep words visible if they are on screen
                }))
            );

            animationFrameId = requestAnimationFrame(moveWords);
        };

        animationFrameId = requestAnimationFrame(moveWords);

        return () => cancelAnimationFrame(animationFrameId); // Cleanup animation frame
    }, [words, showCountdown]);

    // Update parent component with the current list of words
    useEffect(() => {
        onUpdateWords(words);
    }, [words, onUpdateWords]);

    // Highlight the focused word when the user types
    useEffect(() => {
        if (focusedWord && currentInput === focusedWord.text) {
            setHighlightedWord(focusedWord);
            const timer = setTimeout(() => {
                setHighlightedWord(null);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [currentInput, focusedWord]);

    // Utility to get a random Y position for spawning words
    const NUM_Y_POSITIONS = 6;
    const yPositions = Array.from({ length: NUM_Y_POSITIONS }, (_, i) => (i + 1) * (80 / NUM_Y_POSITIONS - 2));

    const getRandomYPosition = () => {
        let newYPos;
        do {
            newYPos = yPositions[Math.floor(Math.random() * yPositions.length)];
        } while (newYPos === lastYPos.current);

        lastYPos.current = newYPos; // Update the last Y position to avoid overlap
        return newYPos;
    };

    // Utility to get the next word in order from the list
    const getNextWord = () => {
        if (wordIndex.current >= wordsList.current.length) return null; // No words left
        const nextWord = wordsList.current[wordIndex.current];
        wordIndex.current += 1; // Move to the next word
        return nextWord;
    };

    return (
        <div className="wordPanel">
            {words.map((w) => (
                <div
                    key={w.id}
                    className={`word ${w.visible ? "" : "invisible"}`}
                    style={{ top: `${w.yPos}%`, left: `${w.xPos}%` }}
                >
                    <p>
                        {w.text.split("").map((char, index) => {
                            const isCharTyped = focusedWord && focusedWord.id === w.id && index < currentInput.length;
                            const isCharMatch = isCharTyped && char === currentInput[index];
                            const isLastChar = focusedWord && focusedWord.id === w.id && index === currentInput.length - 1;
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
