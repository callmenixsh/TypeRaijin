import React from 'react';
import './QuitConfirm.css';
import { useNavigate } from 'react-router-dom';

const QuitConfirm = () => {

    const navigate = useNavigate();
    const onConfirm = () => {
        navigate('/');
      };

      const onCancel = () => {
        navigate('/gamescreen');
      };


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
