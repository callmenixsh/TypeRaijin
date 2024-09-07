import React from 'react'
import { useNavigate } from 'react-router-dom';

const Quit = () => {

    const navigate = useNavigate();
    const onQuitClick = () => {
        navigate('/quitconfirm');
      };

  return (
    <div className="quits" onClick={onQuitClick}>QUIT</div>
  )
}

export default Quit