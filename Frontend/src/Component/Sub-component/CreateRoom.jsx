import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// import socket from '../../socket';

const CreateRoom = ({ initialTime, setDifficulty, motionProps, whileTap }) => {

    const location = useLocation();
    const roomId = location.state?.roomId || 'No Room ID';

    // console.log(RoomId)

    const navigate = useNavigate();

    const handleCreateClick = () => {

        setTimeout(() => {
            navigate(`/${roomId}/in-queue`, {
                state: {
                    initialTime,
                    setDifficulty,
                    roomId,
                }
            });
        }, 300);


    };

    return (
        <motion.button
            {...motionProps}
            whileTap={whileTap}
            className="Play" onClick={handleCreateClick} >
            CREATE
        </motion.button >
    );
};

export default CreateRoom;