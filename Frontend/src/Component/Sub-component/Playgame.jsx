import React from 'react'
import { useNavigate } from "react-router-dom";


const Playgame = () => {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate("/in-queue");
  };

  return (
    <button className='Play' onClick={handlePlayClick}>PLAY</button>
  )
}

export default Playgame