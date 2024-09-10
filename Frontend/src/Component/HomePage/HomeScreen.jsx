import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeScreen.css";
import infoIcon from "../../assets/info.png";

export const HomeScreen = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

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
    localStorage.removeItem('roomID');
    console.log("Username:", username);
    navigate("/creategame", { state: { username } });
  };

  const onJoinGameClick = () => {
    console.log("Username:", username);
    navigate("/joingame", { state: { username } }); 
  };

  return (
    <>
      {/* <div className="infoPng"><img src={infoIcon} alt="Info Icon" /></div> */}
      <div className="homebody">
        <div className="GameTitle">TYPERAIJIN</div>
        <div className="gameStart">
          <div className="UserID">
            <div className="LabelUsername">Enter Username</div>
            <input type="text" value={username} onChange={handleUsernameChange} />
          </div>

          <div className="IdFetch">
            <div className="createGame" onClick={onCreateGameClick}>CREATE ROOM</div>
            <div className="joinGame" onClick={onJoinGameClick}>JOIN ROOM</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
