import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Leaderboard from "../Sub-component/Leaderboard";
import socket from "../../socket";
import "./ResultPage.css";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";

// Function to handle sharing results as an image
function shareResults() {
	const resultsDiv = document.getElementById("results");

	html2canvas(resultsDiv, { scale: 2 }).then((canvas) => {
		const image = canvas.toDataURL("image/png");

		const downloadLink = document.createElement("a");
		downloadLink.href = image;
		downloadLink.download = "results.png";
		downloadLink.click();
	});
}

const ResultPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const roomID = location.state?.roomID;
	const [leaderboard, setLeaderboard] = useState([]);

	useEffect(() => {
		socket.on("gameEnded", ({ leaderboardData, playerStats }) => {
			setLeaderboard(leaderboardData);
		});

		return () => {
			socket.off("gameEnded");
		};
	}, []);

	useEffect(() => {
		const handleBeforeUnload = (event) => {
			sessionStorage.setItem("triedToReload", "true");
			event.preventDefault();
			event.returnValue = "";
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	useEffect(() => {
		if (sessionStorage.getItem("triedToReload") === "true") {
			sessionStorage.removeItem("triedToReload");
			setTimeout(() => {
				navigate("/");
			}, 300);
		}
	}, [navigate]);

	// const totalScore = totalScore || 0;
	// const typingSpeed = totalScore / 7 || 0;

	// const handleReplay = () => {
	//   navigate(`${roomID}`);
	// };

	const handleHome = () => {
		setTimeout(() => {
			navigate("/");
		}, 300);
	};

	return (
		<div id="results" className="resultbody">
			<motion.div
				className="ResultContainer"
				initial={{ scale: 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ type: "spring", stiffness: 400, damping: 20 }}
			>
				<div className="Rank-Panel">
					{/* <div className="Time-up">TIME'S UP!</div> */}
					{/* Pass sorted leaderboard data here */}
					<motion.div
						className="leaderbox"
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{
							type: "spring",
							stiffness: 400,
							damping: 20,
							delay: 0.3,
						}}
					>
						<Leaderboard roomId={roomID} leadTitle={"RESULTS"} leaderboardData={leaderboard} />
					</motion.div>
					<div className="resultOptions">
						<motion.div
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							whileTap={{ scale: 0.9 }}
              transitionWhileTap={{
                type: "spring",
                stiffness: 400,
                damping: 20,
                duration: 0,
              }}
							transition={{
								type: "spring",
								stiffness: 400,
								damping: 20,
								delay: 0.4,
							}}
							className="result-btns"
							id="share-button"
							onClick={shareResults}
						>
							Share
						</motion.div>
						{/* <div className="result-btns rePlay" onClick={handleReplay}>
              Play Again
            </div> */}
						<motion.div
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{
								type: "spring",
								stiffness: 400,
								damping: 20,
								delay: 0.4,
							}}
							whileTap={{ scale: 0.9 }}
              transitionWhileTap={{
                type: "spring",
                stiffness: 400,
                damping: 20,
                duration: 0,
              }}
							className="result-btns quitHome"
							onClick={handleHome}
						>
							Main Menu
						</motion.div>
					</div>
					<div className="stats-panel">
						{/* <div className="Per-Container">
            <h1>PERFORMANCE</h1>
            <p>Total Score: {totalScore} Points</p>
            <p>Typing Speed: {typingSpeed} WPM</p>
          </div> */}
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default ResultPage;
