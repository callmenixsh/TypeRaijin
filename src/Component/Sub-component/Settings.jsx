import React from 'react'
import './Subcomps.css';
import { useNavigate } from "react-router-dom";

const Settings = () => {
const navigate = useNavigate();

 const onSettingsClick = () => {
  navigate("/gamesettings");
 }
    

    return (
        <div className='settings' onClick={onSettingsClick} >SETTINGS</div>
    )
}

export default Settings