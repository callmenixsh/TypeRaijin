import React from "react";
import Leaderboard from "../Sub-component/Leaderboard";
import Settings from "../Sub-component/Settings";
import "./ResultPage.css";

const ResultPage = () => {
	const result = 2;
	const typedWords = 42;
	const typingSpeed = 50;
	const typingAcc = 89;
	const mistakes = 6;
 
	return (
		<>
			<div className="resultbody">
				<div className="Rank">RANK {result} !</div>
				<div className="ResultContainer">
					<div className="Rank-Panel">
						<div className="Time-up">Time's UP!</div>
						<Leaderboard />
					</div>
					<div className="stats-panel">
						<div className="Per-Container">
							<h1>PERFORMANCE</h1>
							<p>Typed Words: {typedWords} Words</p>
							<p>Typing Speed: {typingSpeed} WPM</p>
							<p>Typing Accuracy: {typingAcc}%</p>
							<p>Mistakes: {mistakes}</p>
						</div>

						<div className="resultOptions">
							<div className="result-btns">Share</div>
							<div className="result-btns">Play Again</div>
							<div className="result-btns">Main Menu</div>
						</div>
					</div>
				</div>
			</div>

			{/* <div className="menuBar"> */}
				<Settings />
			{/* </div> */}
		</>
	);
};

export default ResultPage;
