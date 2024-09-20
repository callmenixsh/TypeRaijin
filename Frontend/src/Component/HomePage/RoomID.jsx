import React from 'react';
import copyIcon from '../../assets/copy.png';
import './HomeScreen.css';
import { motion } from 'framer-motion';


const RoomID = ({ roomID, motionProps }) => {


  const handleCopyID = () => {
    navigator.clipboard.writeText(roomID);
    // alert(`Room ID copied to clipboard! ${roomID}`);
  };

  return (
    <motion.div className="createID"
      {...motionProps}>
      <div className="idLabel">Room ID:</div>
      <div className="generatedGameID">{roomID}</div>
      <img
        src={copyIcon}
        style={{ userSelect: 'none', cursor: 'pointer' }}
        alt="Copy Tag"
        onClick={handleCopyID}
      />
    </motion.div>
  );
};

export default RoomID;
