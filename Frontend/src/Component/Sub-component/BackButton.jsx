import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Subcomps.css'
import backIcon from '../../assets/back.png'
import { motion } from 'framer-motion';


const BackButton = ({ motionProps, whileTap }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    setTimeout(() => {
      navigate(-1);
    }, 300);
  };

  return (<>
    <motion.div
      {...motionProps}
      whileTap={whileTap}
      onClick={handleBack}>
      <img src={backIcon} className='prevPageButton' alt="Back Icon" />

    </motion.div>
  </>
  );
};

export default BackButton;
