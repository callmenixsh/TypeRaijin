import React from 'react'
import './HomeScreen.css'

export const HomeScreen = () => {
  return (
    <>
      <div>{/*info-png here*/}</div>
      <div className='TypeRaijin'>
        TYPERAIJIN
      </div>
      <div className='UserName'>
        <div className='Enter'>Enter Username</div>
        <input type="text" />
      </div>
      <div className='ButtHolder'>
        <button className='Play'>PLAY</button>
      </div>
      <div className='Setting'>SETTINGS</div>
    </>
  )
}

export default HomeScreen
