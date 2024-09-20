import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Settings from "../Sub-component/Settings";
import "./HomeScreen.css";
import CreateRoom from "../Sub-component/CreateRoom";
import RoomID from "./RoomID";
import BackButton from "../Sub-component/BackButton";
import { delay, motion } from "framer-motion";

// import { username } from './HomeScreen.jsx';

export const CreateHomeScreen = () => {
	// const username = state?.username || 'Guest';
	const location = useLocation();
	const roomId = location.state?.roomId || 'No Room ID';

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


	// console.log(roomId);
	return (
		<>
			<div className="bodgy">
				<div className="info">{/*info-png here*/}</div>
				<motion.div className="NameTitle">
					<motion.span
						initial={{ opacity: 0, y: 0, scale: 0.8 }}  // Animating only the text
						animate={{ opacity: 1, y: 0, scale: 1 }}
						transition={{ duration: 0.3, ease: "easeOut", delay: 0.01 }}
					>
						Welcome, {username}
					</motion.span>
				</motion.div>

				<div className="gameStart">
					<RoomID
						roomID={roomId}
						motionProps={{
							initial: { scale: 0, opacity: 0 },
							animate: { scale: 1, opacity: 1 },
							transition: { type: 'spring', stiffness: 300, damping: 20 }
						}}
					/>
					<div className="playNback">
						<CreateRoom
							initialTime={selectedTime}
							setDifficulty={selectedDiff}
							roomID={roomId}
							motionProps={{
								initial: { scale: 0, opacity: 0 },
								animate: { scale: 1, opacity: 1 },
								transition: { type: 'spring', stiffness: 300, damping: 20, delay: 0.2 },
							}}
							whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
						/>
						<BackButton
							motionProps={{
								initial: { scale: 0, opacity: 0 },
								animate: { scale: 1, opacity: 1 },
								transition: { type: 'spring', stiffness: 300, damping: 20, delay: 0.3 },
							}}
							whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
						/>
					</div>
				</div>

				{/* <Settings
					selectedTime={selectedTime}
					selectedDiff={selectedDiff}
					setSelectedDiff={setSelectedDiff}
					setSelectedTime={setSelectedTime}
				/> */}

			</div>
		</>
	);
};

export default CreateHomeScreen;
