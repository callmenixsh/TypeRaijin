import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Settings from "../Sub-component/Settings";
import "./HomeScreen.css";
import CreateRoom from "../Sub-component/CreateRoom";
import RoomID from "./RoomID";
import BackButton from "../Sub-component/BackButton";
// import { username } from './HomeScreen.jsx';

export const CreateHomeScreen = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");

	const [selectedTime, setSelectedTime] = useState('60');
	const [selectedDiff, setSelectedDiff] = useState('slow');

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
					<RoomID />
					<div className="playNback">
						<CreateRoom
							initialTime={selectedTime}
							setDifficulty={selectedDiff}
						/>
						<BackButton />
					</div>
				</div>

				{/* <div className="menuBar"> */}
				<Settings
					selectedTime={selectedTime}
					selectedDiff={selectedDiff}
					setSelectedDiff={setSelectedDiff}
					setSelectedTime={setSelectedTime}
				/>

			</div>
		</>
	);
};

export default CreateHomeScreen;
