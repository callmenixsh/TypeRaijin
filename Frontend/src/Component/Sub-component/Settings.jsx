import React, { useState } from "react";
import "./Subcomps.css";
import { useNavigate } from "react-router-dom";
import "../GameScreen/SettingsMenu.css";

const Settings = () => {
	const navigate = useNavigate();
	const [phase, setPhase] = useState(false);
	const [isSettingsVisible, setIsSettingsVisible] = useState(true);

	const toggleSetting = () => {
		setPhase(!phase);
		setIsSettingsVisible(!isSettingsVisible);
	};

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<>
			{isSettingsVisible && (
				<div className="menuBar" onClick={toggleSetting}>
					<div className="settings">
						SETTINGS
					</div>
				</div>
			)}

			{phase && (
				<>
					<div className="overlayed">
						<div className="settingBody">
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
										<button className="applyChanges" onClick={toggleSetting}>APPLY</button>
									</div>
								</div>
							</div>
						</div>
						<div
							className="menuBar"
							onClick={toggleSetting}
							style={{ cursor: "pointer", userSelect: "none" }}
						>
							<div className="exitSettings">X</div>
						</div>
						{/* <div className="menuBar" > */}
						{/* </div> */}
					</div>
				</>
			)}
		</>
	);
};

export default Settings;
