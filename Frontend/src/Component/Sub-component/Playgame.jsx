import React from "react";
import { useNavigate } from "react-router-dom";

const Playgame = ({ initialTime, setDifficulty }) => {
	const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate("/in-queue", {
        state: {
            initialTime: initialTime,
            setDifficulty: setDifficulty
        }
    });
    // console.log(initialTime);
    // console.log(setDifficulty);
};
	return (
		<button className="Play" onClick={handlePlayClick}>
			PLAY
		</button>
	);
};

export default Playgame;
