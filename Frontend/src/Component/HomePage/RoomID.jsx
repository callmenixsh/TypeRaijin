import React, { useState, useEffect } from 'react';
import { customAlphabet } from 'nanoid'; // Import customAlphabet from nanoid
import copyIcon from '../../assets/copy.png'; // Path to your copy icon

// Define a custom alphabet with only letters and numbers
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const generateRoomID = customAlphabet(alphabet, 6); // Generate 6-character alphanumeric code

const RoomID = () => {
  const [roomID, setRoomID] = useState('');

  // Generate or retrieve roomID when the component mounts
  useEffect(() => {
    // Retrieve roomID from localStorage
    const savedRoomID = localStorage.getItem('roomID');
    if (savedRoomID) {
      setRoomID(savedRoomID);
    } else {
      generateNewRoomID();
    }
  }, []);

  // Function to generate and save a new roomID
  const generateNewRoomID = () => {
    const newRoomID = generateRoomID();
    setRoomID(newRoomID);
    localStorage.setItem('roomID', newRoomID);
  };

  // Handle click event to reset roomID
  const handleCreateRoom = () => {
    generateNewRoomID();
  };

  const handleCopyID = () => {
    navigator.clipboard.writeText(roomID);
    alert('Room ID copied to clipboard!');
  };

  return (
    <div className="createID">
      <div className="idLabel">Room ID:</div>
      <div className="generatedGameID">{roomID || 'Generating...'}</div>
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
