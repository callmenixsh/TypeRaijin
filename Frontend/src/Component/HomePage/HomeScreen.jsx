import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeScreen.css";
import "../animate.css";
import socket from "../../socket";
import { motion } from "framer-motion";
import "../animate";
// import * as motion from "framer-motion/client"
// import RoomID from "./RoomID";

export const HomeScreen = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [copyID, setCopyid] = useState("");

	const generateRandomUsername = () => {
		const randomNumber = Math.floor(1000 + Math.random() * 9000);
		return `Guest${randomNumber}`;
	};

	useEffect(() => {
		const storedUsername = localStorage.getItem("username");
		if (storedUsername) {
			setUsername(storedUsername);
		} else {
			const generatedUsername = generateRandomUsername();
			setUsername(generatedUsername);
			localStorage.setItem("username", generatedUsername);
		}
	}, []);

	const handleUsernameChange = (e) => {
		const newUsername = e.target.value;
		setUsername(newUsername);
		localStorage.setItem("username", newUsername);
	};

	const onCreateGameClick = () => {
		localStorage.removeItem("roomId");
		console.log("Username:", username);

		if (!socket.connected) {
			console.error("Socket is not connected");
			return;
		}

		socket.emit(
			"createRoom",
			{ playerInfo: { name: username } },
			(response) => {
				if (response.roomId) {
					console.log(`Room created with ID: ${response.roomId}`);
					localStorage.setItem("roomId", response.roomId);
					// console.log(response.roomId);

					setCopyid(response.roomId);
					console.log(copyID);
					setTimeout(() => {
						navigate(`/creategame/${response.roomId}`, {
							state: { username, roomId: response.roomId },
						});
					}, 200);
				} else {
					console.error("Failed to create room");
				}
			}
		);
	};

	const onJoinGameClick = () => {
		console.log("Username:", username);
		setTimeout(() => {
			navigate("/joingame", { state: { username } });
		}, 200);
	};

	return (
		<div className="homebody">
    <motion.div
      className="titlecontainer"
      initial={{ opacity: 0 }} // Start hidden
      animate={{ opacity: 1 }} // Fade in to visible
      transition={{ duration: 1 }} // Adjust duration as needed
    >
      <div className="GameTitle">
        {['T', 'Y', 'P', 'E', 'R', 'A', 'I', 'J', 'I', 'N'].map((letter, i) => (
          <span key={i} className="glitch-letter">{letter}</span>
        ))}
      </div>
    </motion.div>

			<motion.div className="gameStart">
				<motion.div
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ type: "spring", stiffness: 400, damping: 20 }}
					className="UserID"
				>
					<div className="LabelUsername">Enter Username</div>
					<input
						type="text"
						value={username}
						onChange={handleUsernameChange}
						required
					/>
				</motion.div>

				<motion.div
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{
						type: "spring",
						stiffness: 400,
						damping: 20,
						delay: 0.1,
					}}
					className="IdFetch"
				>
					<motion.div
						className="createGame"
						onClick={onCreateGameClick}
						whileTap={{ scale: 0.9 }}
					>
						CREATE ROOM
					</motion.div>
					<motion.div
						className="joinGame"
						onClick={onJoinGameClick}
						whileTap={{ scale: 0.9 }}
					>
						JOIN ROOM
					</motion.div>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default HomeScreen;
