import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Settings from "../Sub-component/Settings";
import "./HomeScreen.css";
import BackButton from "../Sub-component/BackButton";
import JoinRoom from "../Sub-component/JoinRoom";

export const JoinHomeScreen = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");

	useEffect(() => {
		const storedUsername = localStorage.getItem("username");
		if (storedUsername) {
			setUsername(storedUsername);
		}
	}, []);

	return (
		<>
			<div className="bodgy">
				<div className="info">{/*info-png here*/}</div>
				<div className="NameTitle">Welcome, {username}</div>

				<div className="gameStart">
					<div className="joinID">
						<div className="idLabel" >JOIN ROOM : </div>
						<input className="enteredGameID" maxLength="6" />
					</div>
					<div className="playNback">
						<JoinRoom />
						<BackButton />
					</div>
				</div>
			</div>
		</>
	);
};

export default JoinHomeScreen;
