import React from "react";
import "./SettingsMenu.css";

const SettingsMenu = () => {
	return (
		<div className="settingbody">
			<div className="settingsPanel">
				<div className="settingLabel">SETTINGS</div>

				<div className="gameOptions">
					<div className="timerS">
						<div className="timerLabel">Timer :</div>
						<div className="timerOptions">
							<div className="fifteenSec activeoption">15s</div>
							<div className="thirtySec">30s</div>
							<div className="sixtySec">60s</div>
						</div>
					</div>
					<div className="difficultyS">
						<div className="difficultyLabel">Difficulty :</div>
						<div className="difficultyOptions">
							<div className="diffcultyEasy">Easy</div>
							<div className="diffcultyMedium activeoption">Medium</div>
							<div className="diffcultyHard">Hard</div>
						</div>
					</div>
					<div className="applyButton">
						<button className="applyChanges">APPLY</button>
					</div>
				</div>
				<div className="menuBar">
					<div className="exitSettings">X</div>
				</div>
			</div>
		</div>
	);
};

export default SettingsMenu;
