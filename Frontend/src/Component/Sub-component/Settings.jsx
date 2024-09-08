import React, { useState } from "react";
import "./Subcomps.css";
import "../GameScreen/SettingsMenu.css";

const Settings = ({ onTimerChange }) => {
    const [phase, setPhase] = useState(false);
    const [selectedTime, setSelectedTime] = useState('60s'); // Default timer

    const toggleSetting = () => {
        setPhase(!phase);
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    const handleApply = () => {
        // Convert selected time to seconds
        const seconds = parseInt(selectedTime, 10);
        onTimerChange(seconds / 60); // Convert to minutes for GameScreen
        toggleSetting(); // Close settings after applying
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
                                <div className="settingLabel">SETTINGS</div>

                                <div className="gameOptions">
                                    <div className="timerS">
                                        <div className="timerLabel">Timer :</div>
                                        <div className="timerOptions">
                                            <div
                                                className={`option ${selectedTime === '15s' ? 'activeoption' : ''}`}
                                                onClick={() => handleTimeChange('15s')}
                                            >
                                                15s
                                            </div>
                                            <div
                                                className={`option ${selectedTime === '30s' ? 'activeoption' : ''}`}
                                                onClick={() => handleTimeChange('30s')}
                                            >
                                                30s
                                            </div>
                                            <div
                                                className={`option ${selectedTime === '60s' ? 'activeoption' : ''}`}
                                                onClick={() => handleTimeChange('60s')}
                                            >
                                                60s
                                            </div>
                                        </div>
                                    </div>
                                    <div className="applyButton">
                                        <button className="applyChanges" onClick={handleApply}>APPLY</button>
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
