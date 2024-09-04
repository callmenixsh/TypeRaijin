import React from 'react'
import './HomeScreen.css'

export const HomeScreen = () => {
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
        <button className='Play' >PLAY</button>
      </div>
      <div className='Setting'>SETTINGS</div>
    </div>
    </>
  )
}

export default HomeScreen
