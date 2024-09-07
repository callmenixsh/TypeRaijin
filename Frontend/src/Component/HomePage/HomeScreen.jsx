import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Settings from "../Sub-component/Settings";
import "./HomeScreen.css";

export const HomeScreen = () => {
	const navigate = useNavigate();

	const onCreateGameClick = () => {
		navigate("/creategame");
	}

	const onJoinGameClick = () => {
		navigate("/joingame");
	}



	return (
		<>
			<div className="homebody">
				<div className="info">{/*info-png here*/}</div>
				<div className="GameTitle">TYPERAIJIN</div>
				<div className="gameStart">
					<div className="UserID">
						<div className="LabelUsername">Enter Username</div>
						<input type="text" />
					</div>

					<div className="IdFetch">
						<div className="createGame" onClick={onCreateGameClick}>CREATE ROOM</div>
						<div className="joinGame" onClick={onJoinGameClick}>JOIN ROOM</div>
					</div>
				</div>
				{/* 
				<div className="menuBar">
					<Settings />
				</div> */}
			</div>
		</>
	);
};

export default HomeScreen;
