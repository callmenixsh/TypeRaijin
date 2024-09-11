import React, { useState } from "react";
import "./Subcomps.css";
import "./SettingsMenu.css";

const Settings = ({
	selectedTime,
	selectedDiff,
	setSelectedTime,
	setSelectedDiff,
}) => {
	const [phase, setPhase] = useState(false);
	const toggleSetting = () => {
		setPhase(!phase);
	};

	const handleTimeChange = (time) => {
		setSelectedTime(time);
	};

	const handleDiffChange = (diff) => {
		setSelectedDiff(diff);
	};

	const handleApply = () => {
		toggleSetting();
        // console.log(selectedTime);
        // console.log(selectedDiff);
	};

	return (
		<>
			<div className="menuBar" onClick={toggleSetting}>
				<div className="settings">SETTINGS</div>
			</div>

			{phase && (
				<>
					<div className="overlayed">
						<div className="settingBody">
							<div className="settingsPanel">
								<div className="settingLabel" style={{ fontWeight: "1000" }}>
									SETTINGS
								</div>

								<div className="gameOptions">
									<div className="timerS">
										<div className="timerLabel" style={{ fontWeight: "1000" }}>
											Timer :
										</div>
										<div className="timerOptions">
											<div
												className={`option ${
													selectedTime === "30" ? "activeoption" : ""
												}`}
												onClick={() => handleTimeChange("30")}
											>
												30s
											</div>
											<div
												className={`option ${
													selectedTime === "60" ? "activeoption" : ""
												}`}
												onClick={() => handleTimeChange("60")}
											>
												60s
											</div>
											<div
												className={`option ${
													selectedTime === "90" ? "activeoption" : ""
												}`}
												onClick={() => handleTimeChange("90")}
											>
												90s
											</div>
										</div>
									</div>
									<div className="diffS">
										<div className="diffLabel" style={{ fontWeight: "1000" }}>
											Difficulty :
										</div>
										<div className="diffOptions">
											<div
												className={`option ${
													selectedDiff === "slow" ? "activeoption" : ""
												}`}
												onClick={() => handleDiffChange("slow")}
											>
												Slow
											</div>
											<div
												className={`option ${
													selectedDiff === "fast" ? "activeoption" : ""
												}`}
												onClick={() => handleDiffChange("fast")}
											>
												Fast
											</div>
										</div>
									</div>
									<div className="applyButton">
										<button className="applyChanges" onClick={handleApply}>
											APPLY
										</button>
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
					</div>
				</>
			)}
		</>
	);
};

export default Settings;
