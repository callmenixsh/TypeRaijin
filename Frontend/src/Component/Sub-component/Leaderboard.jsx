import React, { useState, useEffect } from "react";
import socket from "../../socket";

const Leaderboard = ({ roomId }) => {
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		if (!roomId) return;

		const handleUpdatePlayerList = ({ playerList }) => {
			setPlayers(playerList);
		};

		const handleQuitUpdate = ({ playerList }) => {
			setPlayers(playerList);
			console.log("Received quitUpdate:", playerList);
		};

		socket.emit("requestPlayerList", { roomId });
		socket.on("updatePlayerList", handleUpdatePlayerList);
		socket.on("quitUpdate", handleQuitUpdate);

		return () => {
			socket.off("updatePlayerList", handleUpdatePlayerList);
			socket.off("quitUpdate", handleQuitUpdate);
		};
	}, [roomId]);

	const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

	return (
		<div className="leaderBoard">
			<p className="leaderLabel">LEADERBOARD</p>
			<div className="playerList">
				{sortedPlayers.map((player, index) => (
					<div className={`player${index + 1} playerS`} key={player.id}>
						<div className="rank">{index + 1}</div>
						<div className="playerName">{player.name}</div>
						<div className="score">{player.score} pts</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Leaderboard;
