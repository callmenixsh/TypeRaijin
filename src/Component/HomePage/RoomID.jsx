import React from 'react'
import { useParams } from 'react-router-dom';

const RoomID = () => {
    const params = useParams();

    return (
        <>
            <div className="createID">
                <div className="idLabel">Room ID : </div>
                <div className="generatedGameID">{params.roomID}</div>
                <img src="copy.png"></img>
            </div>
        </>

    )
}

export default RoomID