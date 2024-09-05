// QuitConfirmation.jsx
import React from 'react';
import './QuitConfirm.css'; // Add styles for the overlay and modal

const QuitConfirm = ({ onConfirm, onCancel }) => {
    return (
        <div className="overlay">
            <div className="modal">
                <p>Are you sure you want to quit the game?</p>
                <div className="buttonGroup">
                    <button className="confirmButton" onClick={onConfirm}>Yes</button>
                    <button className="cancelButton" onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    );
};

export default QuitConfirm;
