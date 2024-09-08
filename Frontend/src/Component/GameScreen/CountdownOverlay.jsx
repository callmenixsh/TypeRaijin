import React, { useState, useEffect } from 'react';
import './GameScreen.css';

const CountdownOverlay = ({ onComplete }) => {
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setTimeout(() => onComplete(), 1000);
        }
    }, [countdown, onComplete]);

    return (
        <div className="countdown-overlay">
            <div className="countdown-text">
                {countdown > 0 ? countdown : 'Type!'}
            </div>
        </div>
    );
};

export default CountdownOverlay;