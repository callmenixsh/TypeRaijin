import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeScreen.css";
import BackButton from "../Sub-component/BackButton";
import socket from "../../socket";
import { motion } from "framer-motion";

export const JoinHomeScreen = () => {
	const [username, setUsername] = useState("");
	const [inputRoomId, setInputRoomId] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const storedUsername = localStorage.getItem("username");
		if (storedUsername) {
			setUsername(storedUsername);
		}
	}, []);

	const handleInputChange = (event) => {
		setInputRoomId(event.target.value);
	};

	const handleJoinClick = () => {
		if (inputRoomId.trim().length < 6) {
			alert("Please enter a valid Room ID");
			return;
		}

		socket.emit(
			"joinRoom",
			{ roomId: inputRoomId, username: username },
			(response) => {
				if (response.success) {
					navigate(`/${inputRoomId}/in-queue`, {
						state: { roomId: inputRoomId },
					});
				} else {
					alert(response.message);
				}
			}
		);
	};

	return (
		<div className="bodgy">
			{/* <div className="info">{}</div> */}
			<motion.div className="NameTitle">
				<motion.span
					initial={{ opacity: 0, y: 0, scale: 0.8 }} // Animating only the text
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{ duration: 0.3, ease: "easeOut", delay: 0.01 }}
				>
					Welcome, {username}
				</motion.span>
			</motion.div>

			<div className="gameStart">
				<motion.div
					className="joinID"
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{
						type: "spring",
						stiffness: 400,
						damping: 20,
						delay: 0.1,
					}}
				>
					<div className="idLabel">JOIN ROOM : </div>
					<input
						className="enteredGameID"
						onChange={handleInputChange}
						maxLength="6"
						style={{ textTransform: "uppercase" }}
					/>
				</motion.div>
				<div className="playNback">
					<motion.button
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{
							type: "spring",
							stiffness: 400,
							damping: 20,
							delay: 0.2,
						}}
						className="Play"
						onClick={handleJoinClick}
						style={{ fontSize: "3vh" }}
					>
						JOIN
					</motion.button>
					<BackButton
						motionProps={{
							initial: { scale: 0, opacity: 0 },
							animate: { scale: 1, opacity: 1 },
							transition: {
								type: "spring",
								stiffness: 300,
								damping: 20,
								delay: 0.3,
							},
						}}
						whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
					/>
				</div>
			</div>
		</div>
	);
};

export default JoinHomeScreen;
