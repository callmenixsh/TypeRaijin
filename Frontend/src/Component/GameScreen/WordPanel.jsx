import React, { useState, useEffect, useRef } from "react";
import "./WordPanel.css";
import socket from "../../socket";
import { motion } from "framer-motion";

const WordPanel = ({
  showCountdown,
  onUpdateWords,
  currentInput,
  focusedWord,
  gameDifficulty,
  roomID,
  setCurrentInput,
  setFocusedWord,
}) => {
  const [words, setWords] = useState([]);
  const lastYPos = useRef(null);
  const wordsList = useRef([]);
  const wordIndex = useRef(0);

  useEffect(() => {
    if (roomID) {
      socket.emit("gamestart", { roomId: roomID });
    }
  }, [roomID]);

  useEffect(() => {
    const handleSendWords = ({ words }) => {
      wordsList.current = words.map((word) => word + " ");
    };

    socket.on("sendWords", handleSendWords);

    return () => {
      socket.off("sendWords", handleSendWords);
    };
  }, []);

  useEffect(() => {
    if (!showCountdown) {
      const wordInterval = setInterval(() => {
        const nextWord = getNextWord();
        if (!nextWord) return;

        const randomY = getRandomYPosition();

        setWords((prevWords) => [
          ...prevWords,
          {
            text: nextWord,
            id: Date.now(),
            yPos: randomY,
            xPos: 100,
            visible: true,
            typedChars: Array(nextWord.length).fill(false), 
          },
        ]);
      }, gameDifficulty);

      return () => clearInterval(wordInterval);
    }
  }, [showCountdown, gameDifficulty]);

  useEffect(() => {
    if (showCountdown) return;

    let animationFrameId;

    const moveWords = () => {
      setWords((prevWords) =>
        prevWords
          .map((word) => ({
            ...word,
            xPos: word.xPos - 0.1899,
            visible: word.xPos > 0,
          }))
          .filter((word) => word.visible)
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
      setWords((prevWords) =>
        prevWords.filter((word) => word.id !== focusedWord.id)
      );
      setFocusedWord(null);
      setCurrentInput("");
    }
  }, [currentInput, focusedWord, setCurrentInput, setFocusedWord]);

  const NUM_Y_POSITIONS = 6;
  const yPositions = Array.from(
    { length: NUM_Y_POSITIONS },
    (_, i) => (i + 1) * (80 / NUM_Y_POSITIONS - 2)
  );

  const getRandomYPosition = () => {
    let newYPos;
    do {
      newYPos = yPositions[Math.floor(Math.random() * yPositions.length)];
    } while (newYPos === lastYPos.current);

    lastYPos.current = newYPos;
    return newYPos;
  };

  const getNextWord = () => {
    if (wordIndex.current >= wordsList.current.length) return null;
    const nextWord = wordsList.current[wordIndex.current];
    wordIndex.current += 1;
    return nextWord;
  };

  return (
    <div className="wordPanel">
      {words.map((w) => (
        w.visible && (
          <motion.div
            key={w.id}
            className={`word ${!w.visible ? "invisible" : ""}`}
            style={{ top: `${w.yPos}%`, left: `${w.xPos}%` }}
            animate={{
              color: w.xPos < 20 ? "red" : "black", 
              opacity: w.xPos < 10 ? 0 : 1,
            }}
            transition={{ duration: 1 }}
          >
            <p>
              {w.text.split("").map((char, index) => {
                const isCharTyped =
                  focusedWord &&
                  focusedWord.id === w.id &&
                  index < currentInput.length;
                const isCharMatch = isCharTyped && char === currentInput[index];
                const isSpaceTyped = isCharTyped && char === " ";

                if (isCharTyped) {
                  w.typedChars[index] = true; 
                }

                return (
                  <motion.span
                    key={index}
                    initial={{ opacity: 1 }}
                    animate={{
                      opacity:
                        w.typedChars[index] || isSpaceTyped ? 0 : 1, 
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      color: isCharMatch ? "green" : "black",
                      fontWeight: isCharMatch ? "bold" : "600",
                    }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </p>
          </motion.div>
        )
      ))}
    </div>
  );
};

export default WordPanel;
