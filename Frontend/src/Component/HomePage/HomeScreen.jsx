import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeScreen.css";
import socket from "../../socket";
// import RoomID from "./RoomID";

export const HomeScreen = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [copyID, setCopyid] = useState(''); // Ensure this is named copyID, not RoomId

  // Generates a random username if none is set
  const generateRandomUsername = () => {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return `Guest${randomNumber}`;
  };

  // Set the username on initial load
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      const generatedUsername = generateRandomUsername();
      setUsername(generatedUsername);
      localStorage.setItem("username", generatedUsername);
    }
  }, []);

  // Handle input change and store the username in localStorage
  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    localStorage.setItem("username", newUsername);
  };

  // Emit the createRoom event with the username
  const onCreateGameClick = () => {
    localStorage.removeItem("roomId"); // Ensure it's removed first
    console.log("Username:", username);

    // Check if socket is connected before emitting
    if (!socket.connected) {
      console.error("Socket is not connected");
      return;
    }

    // Emit the createRoom event with player info
    socket.emit(
      "createRoom",
      { playerInfo: { name: username } },
      (response) => {
        if (response.roomId) {
          console.log(`Room created with ID: ${response.roomId}`);
          localStorage.setItem("roomId", response.roomId); // Store the room ID
          // console.log(response.roomId);

          setCopyid(response.roomId);
          console.log(copyID);

          navigate(`/creategame/${response.roomId}`, {
            state: { username, roomId: response.roomId },
          });
        } else {
          console.error("Failed to create room");
        }
      }
    );
  };

  // Navigate to join game screen with username
  const onJoinGameClick = () => {
    console.log("Username:", username);
    navigate("/joingame", { state: { username } });
  };

  return (
    <div className="homebody">
      <div className="GameTitle">TYPERAIJIN</div>
      <div className="gameStart">
        <div className="UserID">
          <div className="LabelUsername">Enter Username</div>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>

        <div className="IdFetch">
          <div className="createGame" onClick={onCreateGameClick}>
            CREATE ROOM
          </div>
          <div className="joinGame" onClick={onJoinGameClick}>
            JOIN ROOM
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;