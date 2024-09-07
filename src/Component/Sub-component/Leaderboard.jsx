import React from "react";

const Leaderboard = () => {
	const yellow = 'Yellow';
	const red = 'Red';
	const purple = 'Purple';
	const green = 'Green';

	return (
		<>
			<div className="leaderBoard">
				<div className="leaderLabel">LEADERBOARD</div>

				<div className="playerList">
					<div className="player1 playerT">{yellow}</div>
					<div className="player2 playerS">{red}</div>
					<div className="player3 playerS">{purple}</div>
					<div className="player4 playerS">{green}</div>
				</div>
			</div>
		</>
	);
};

export default Leaderboard;
