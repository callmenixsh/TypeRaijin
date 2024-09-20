import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./GameScreen.css";
import Quits from "../Sub-component/Quit";
import Leaderboard from "../Sub-component/Leaderboard";
import CountdownOverlay from "./CountdownOverlay";
import WordPanel from "./WordPanel";
import logoIcon from "../../assets/logo.png";
import socket from "../../socket";
import { motion } from "framer-motion";

const GameScreen = () => {
	const location = useLocation();
	const roomID = location.state?.roomId;
	const initialTime = location.state?.initialTime || 60;

	const setDifficulty = location.state?.setDifficulty;
	const gameDifficulty = setDifficulty === "fast" ? 1000 : 2000;

	const [timeLeft, setTimeLeft] = useState(initialTime);
	const [showCountdown, setShowCountdown] = useState(true);
	const [currentInput, setCurrentInput] = useState("");
	const [currentWords, setCurrentWords] = useState([]);
	const [focusedWord, setFocusedWord] = useState(null);
	const [score, setScore] = useState(0);
	const navigate = useNavigate();

	const inputRef = useRef(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

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
					prevWords.filter((word) => word.id !== matchingWord.id)
				);
				setFocusedWord(null);
				setCurrentInput("");

				const newScore = score + matchingWord.text.length;
				setScore(newScore);

				socket.emit("updateScore", { roomId: roomID, score: newScore });
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
				setCurrentInput("");
			}
		}
	};

	useEffect(() => {
		if (timeLeft === 0) {
			socket.emit("endGame", { roomId: roomID });
		}
	}, [timeLeft, roomID]);

	useEffect(() => {
		const handleBeforeUnload = (event) => {
			sessionStorage.setItem("triedToReload", "true");
			event.preventDefault();
			event.returnValue = "";
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	useEffect(() => {
		if (sessionStorage.getItem("triedToReload") === "true") {
			sessionStorage.removeItem("triedToReload");
			navigate("/");
		}
	}, [navigate]);

	useEffect(() => {
		if (showCountdown) return;

		if (timeLeft > 0) {
			const timerId = setTimeout(() => {
				setTimeLeft(timeLeft - 1);
			}, 1000);

			return () => clearTimeout(timerId);
		} else {
			navigate("/result", {
				state: { roomID },
			});
		}
	}, [timeLeft, showCountdown, navigate]);

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
			.toString()
			.padStart(2, "0")}`;
	};

	useEffect(() => {
		if (timeLeft === 0) {
			socket.emit(
				"requestFinalLeaderboard",
				{ roomID },
				(leaderboardData, playerStats) => {
					navigate("/result", {
						state: {
							roomID,
							leaderboardData,
							playerStats,
						},
					});
				}
			);
		}
	}, [timeLeft, navigate, roomID]);

	return (
		<div className="boddy">
			{showCountdown && (
				<CountdownOverlay onComplete={handleCountdownComplete} />
			)}
			<motion.div
				initial={{ scale: 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ type: "spring", stiffness: 400, damping: 30, delay: 3.3 }}
				className={`gameUI ${showCountdown ? "blur" : ""}`}
			>
				<WordPanel
					showCountdown={showCountdown}
					onUpdateWords={handleUpdateWords}
					currentInput={currentInput}
					focusedWord={focusedWord}
					gameDifficulty={gameDifficulty}
					roomID={roomID}
				/>
				<div className="tabList">
					<div className="notleaderbord">
						<div className="titleBar">
							<img src={logoIcon} alt="logo" />
							TypeRAIJIN
						</div>
						<div className="timer">{formatTime(timeLeft)}</div>
					</div>
					<div className="yesleaderbord">
						<Leaderboard roomId={roomID} leadTitle={"LEADERBOARD"} />
					</div>
				</div>
			</motion.div>
			<motion.input
				ref={inputRef}
				className="typingPanel "
				spellCheck="false"
				maxLength="11"
				value={currentInput}
				onChange={handleInputChange}
				initial={{ y: 100, opacity: 0 }} // Start below and transparent
				animate={{ y: 0, opacity: 1 }} // Move to original position and fade in
				exit={{ y: 50, opacity: 0 }} // Move down and fade out when unmounted
				transition={{ type:"spring", damping: 30, stiffness: 300, duration: 0.5 , delay: 3.3}}
			/>
			{/* <div className="menuBar">
                <Quits />
            </div> */}
		</div>
	);
};

export default GameScreen;
