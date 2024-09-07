import React from 'react'
import { useNavigate } from "react-router-dom";


const Playgame = () => {
	const navigate = useNavigate();

    const handlePlayClick = () => {
        navigate("/gamescreen");
    };

  return (
    <button className='Play' onClick={handlePlayClick}>PLAY</button>
  )
}

export default Playgame