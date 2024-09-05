import React, { useState } from 'react'
import './HomeScreen.css'
import { useNavigate } from 'react-router-dom';

export const HomeScreen = () => {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate('/gamescreen');
  };


  return (
    <>
      <div className='bodgy'>
        <div>{/*info-png here*/}</div>
        <div className='TypeRaijin'>
          TYPERAIJIN
        </div>
        <div className='UserName'>
          <div className='Enter'>Enter Username</div>
          <input type="text" />
        </div>
        <div className='ButtHolder'>
          <button className='Play' onClick={handlePlayClick}>PLAY</button>
        </div>
        <div className='Setting'>SETTINGS</div>
      </div>
    </>
  )
}

export default HomeScreen
