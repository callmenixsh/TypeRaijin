import React from "react";
import { useNavigate } from "react-router-dom";
import Leaderboard from "../Sub-component/Leaderboard";
import "./ResultPage.css";

import html2canvas from 'html2canvas';

function shareResults() {
  const resultsDiv = document.getElementById('results');

  // Ensure full content is captured, even if larger than the viewport
  html2canvas(resultsDiv, { scale: 2 }).then((canvas) => {
    const image = canvas.toDataURL('image/png');

    const downloadLink = document.createElement('a');
    downloadLink.href = image;
    downloadLink.download = 'results.png';
    downloadLink.click();
    console.log("huhaha");
  });
}

const ResultPage = () => {
  const navigate = useNavigate();

  const handleReplay = () => {
    navigate("/in-queue");
  };

  const handleHome = () => {
    navigate("/");
  };

  const result = 2;
  const typedWords = 42;
  const typingSpeed = 50;
  const typingAcc = 89;
  const mistakes = 6;

  return (
    <div id="results" className="resultbody">
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
            <div className="result-btns" id="share-button" onClick={shareResults}>
              Share
            </div>
            <div className="result-btns rePlay" onClick={handleReplay}>
              Play Again
            </div>
            <div className="result-btns quitHome" onClick={handleHome}>
              Main Menu
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
