import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Settings from "../Sub-component/Settings";
import "./HomeScreen.css";
import Play from "../Sub-component/Playgame";

export const JoinHomeScreen = () => {
	const navigate = useNavigate();

	const onPlayClick = () => {
		navigate("/gamescreen");
	};

	return (
		<>
			<div className="bodgy">
				<div className="info">{/*info-png here*/}</div>
				<div className="GameTitle">TYPERAIJIN</div>

				<div className="gameStart">
					<div className="joinID">
						<div className="idLabel">JOIN ROOM : </div>
						<input className="enteredGameID"/>
					</div>
					<Play />
				</div>
				<div className="menuBar">
					<Settings />
				</div>
			</div>
		</>
	);
};

export default JoinHomeScreen;
