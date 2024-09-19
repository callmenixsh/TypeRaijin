import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeScreen.css";
import "../animate.css";
import socket from "../../socket";
// import RoomID from "./RoomID";

export const HomeScreen = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [copyID, setCopyid] = useState(''); 

  const generateRandomUsername = () => {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return `Guest${randomNumber}`;
  };

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

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    localStorage.setItem("username", newUsername);
  };

  const onCreateGameClick = () => {
    localStorage.removeItem("roomId");
    console.log("Username:", username);

    if (!socket.connected) {
      console.error("Socket is not connected");
      return;
    }

    socket.emit(
      "createRoom",
      { playerInfo: { name: username } },
      (response) => {
        if (response.roomId) {
          console.log(`Room created with ID: ${response.roomId}`);
          localStorage.setItem("roomId", response.roomId);
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

  const onJoinGameClick = () => {
    console.log("Username:", username);
    navigate("/joingame", { state: { username } });
  };

  return (
    <div className="homebody">
<div className="GameTitle cssanimation leBeat ">
  <span>T</span>
  <span>Y</span>
  <span>P</span>
  <span>E</span>
  <span>R</span>
  <span>A</span>
  <span>I</span>
  <span>J</span>
  <span>I</span>
  <span>N</span>
</div>

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