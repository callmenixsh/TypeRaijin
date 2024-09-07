import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Subcomps.css'
import backIcon from '../../assets/back.png'

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (<>
    <div  onClick={handleBack}>
    <img src={backIcon} style={{ width: '30px',height: '20px' }} alt="Back Icon" />

    </div>
  </>
  );
};

export default BackButton;
