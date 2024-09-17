import React from 'react';
import copyIcon from '../../assets/copy.png';
import './HomeScreen.css';

const RoomID = ({ roomID }) => {


  const handleCopyID = () => {
    navigator.clipboard.writeText(roomID);
    // alert(`Room ID copied to clipboard! ${roomID}`);
  };

  return (
    <div className="createID">
      <div className="idLabel">Room ID:</div>
      <div className="generatedGameID">{roomID}</div>
      <img
        src={copyIcon}
        style={{ userSelect: 'none', cursor: 'pointer' }}
        alt="Copy Tag"
        onClick={handleCopyID}
      />
    </div>
  );
};

export default RoomID;
