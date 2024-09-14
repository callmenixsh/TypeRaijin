import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeScreen.css";
import BackButton from "../Sub-component/BackButton";
import socket from "../../socket";


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

		// Emit join room event to the server
		socket.emit("joinRoom", { roomId: inputRoomId, username: username }, (response) => {
			if (response.success) {
				navigate(`/${inputRoomId}/in-queue`, {
					state: { roomId: inputRoomId },
				});
			} else {
				alert(response.message);
			}
		});
	};

	return (
		<div className="bodgy">
			<div className="info">{/*info-png here*/}</div>
			<div className="NameTitle">Welcome, {username}</div>

			<div className="gameStart">
				<div className="joinID">
					<div className="idLabel">JOIN ROOM : </div>
					<input
						className="enteredGameID"
						onChange={handleInputChange}
						maxLength="6"
						style={{ textTransform: 'uppercase' }}
					/>
				</div>
				<div className="playNback">
					<button
						className="Play"
						onClick={handleJoinClick}
						style={{ fontSize: "3vh" }}
					>
						JOIN
					</button>
					<BackButton />
				</div>
			</div>
		</div>
	);
};

export default JoinHomeScreen;
