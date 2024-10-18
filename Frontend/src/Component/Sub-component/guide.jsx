import React, { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import './Subcomps.css';

const Guide = () => {
  const [showGuide, setShowGuide] = useState(false);

  const handleMouseEnter = () => setShowGuide(true);
  const handleMouseLeave = () => setShowGuide(false);
  const handleClick = () => setShowGuide(!showGuide);

  return (
    <div 
      className="guide-container" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <AiOutlineInfoCircle className="info-icon" />
      {showGuide && (
        <div className="guide-menu">
          <h3>How to play</h3>
          <ul>
            <li>Type the words as fast as you can. </li>
            <li>Avoid letting words reach the end. </li>
            <li>Careful with what words you type. </li>
            <li>Compete against others in multiplayer. </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Guide;
