import React, { useState, useEffect } from "react";
import socket from "../../socket";

const Leaderboard = ({ roomId }) => {
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		// console.log(roomId);
		if (!roomId) return;
		socket.emit("requestPlayerList", { roomId });
		socket.on("updatePlayerList", ({ playerList }) => {
			setPlayers(playerList);
		});

		socket.on("quitUpdate", ({ playerList }) => {
			setPlayers(playerList);
			console.log("Received quitUpdate:", playerList);
		});

		return () => {
			socket.off("updatePlayerList");
			socket.off("quitUpdate");
		};
	}, [roomId]);

	return (
		<>
			<div className="leaderBoard">
				<div className="leaderLabel">LEADERBOARD</div>

				<div className="playerList">
					{players.map((player, index) => (
						<div className={`player${index + 1} playerS`} key={index}>
							<div className="playerName">{player.name}</div>
							<div className="score">{player.score}</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Leaderboard;
