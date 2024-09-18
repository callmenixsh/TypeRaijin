import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Leaderboard from "../Sub-component/Leaderboard";
import socket from "../../socket";
import "./ResultPage.css";
import html2canvas from "html2canvas";

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
      navigate("/");
    }
  }, [navigate]);

  // Extract player stats
  // const totalScore = totalScore || 0;
  // const typingSpeed = totalScore / 7 || 0;

  // const handleReplay = () => {
  //   navigate(`${roomID}`);
  // };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div id="results" className="resultbody">
      <div className="ResultContainer">
        <div className="Rank-Panel">
          {/* <div className="Time-up">TIME'S UP!</div> */}
          {/* Pass sorted leaderboard data here */}
          <div className="leaderbox">
            <Leaderboard roomId={roomID} leaderboardData={leaderboard} />
          </div>
          <div className="resultOptions">
            <div
              className="result-btns"
              id="share-button"
              onClick={shareResults}
            >
              Share
            </div>
            {/* <div className="result-btns rePlay" onClick={handleReplay}>
              Play Again
            </div> */}
            <div className="result-btns quitHome" onClick={handleHome}>
              Main Menu
            </div>
          </div>
          <div className="stats-panel">
            {/* <div className="Per-Container">
            <h1>PERFORMANCE</h1>
            <p>Total Score: {totalScore} Points</p>
            <p>Typing Speed: {typingSpeed} WPM</p>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
