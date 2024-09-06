import React from 'react';
import './EditSettings.css'; // Add styles for the settings dialog

const EditSettings = () => {
    return (
        <div className="settings-overlay">
            <div className="settings-dialog">
                <div className="settings-header">
                    <h2>Settings</h2>
                </div>
                <div className="settings-content">
                </div>
            </div>
        </div>
    );
};

export default EditSettings;
