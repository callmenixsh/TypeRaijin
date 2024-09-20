import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; 
import socket from "../../socket";

const Leaderboard = ({ roomId, leadTitle }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (!roomId) return;

    const handleUpdatePlayerList = ({ playerList }) => {
      setPlayers(playerList);
    };

    const handleQuitUpdate = ({ playerList }) => {
      setPlayers(playerList);
      console.log("Received quitUpdate:", playerList);
    };

    socket.emit("requestPlayerList", { roomId });
    socket.on("updatePlayerList", handleUpdatePlayerList);
    socket.on("quitUpdate", handleQuitUpdate);

    return () => {
      socket.off("updatePlayerList", handleUpdatePlayerList);
      socket.off("quitUpdate", handleQuitUpdate);
    };
  }, [roomId]);

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="leaderBoard">
      <p className="leaderLabel">{leadTitle}</p>
      <div className="playerList">
        {sortedPlayers.map((player, index) => (
          <div className={`player${index + 1} playerS`} key={player.id}>
            <div className="rank">{index + 1}</div>

            {/* Sliding animation for player names */}
            <motion.div
              className="playerName"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              {player.name}
            </motion.div>

            <motion.div
              className="score"
              initial={{ scale: 1 }} 
              animate={{ scale: [1, 1.4, 1] }} 
              transition={{
                duration: 0.3,
                ease: "easeInOut", 
              }}
              key={player.score} 
            >
              {player.score} pts
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
