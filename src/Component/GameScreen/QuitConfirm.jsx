// QuitConfirmation.jsx
import React from 'react';
import './QuitConfirm.css'; // Add styles for the overlay and modal

const QuitConfirm = ({ onConfirm, onCancel }) => {
    return (
        <div className="overlay">
            <div className="modal">
                <p>YOU WANNA QUIT FOSHO?</p>
            </div>
            <div className="buttonGroup">
                <button className="confirmButton" onClick={onConfirm}>YESSIR</button>
                <button className="cancelButton" onClick={onCancel}>NOSIR</button>
            </div>
        </div>
    );
};

export default QuitConfirm;
