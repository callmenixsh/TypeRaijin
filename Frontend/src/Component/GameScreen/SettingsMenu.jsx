import React from "react";
import "./SettingsMenu.css";
import { useNavigate } from "react-router-dom";

const SettingsMenu = () => {
	const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); 
  };
	return (
  <></>
	);
};

export default SettingsMenu;
