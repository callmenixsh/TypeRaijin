import React, { useState, useEffect } from 'react';
import copyIcon from '../../assets/copy.png';
import io from 'socket.io-client';

const RoomID = () => {


  const [roomId, setRoomId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const socket = io();

  // Emit the createRoom event when the component mounts or playerName changes
  useEffect(() => {
    if (playerName) {
      socket.emit('createRoom', { playerInfo: { name: playerName } }, (response) => {
        setRoomId(response.roomId); // Set the room ID state
      });
    }
  }, [playerName]);



  const handleCopyID = () => {
    navigator.clipboard.writeText(roomId);
    alert('Room ID copied to clipboard!');
  };

  return (
    <div className="createID">
      <div className="idLabel">Room ID:</div>
      <div className="generatedGameID">{roomId}</div>
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