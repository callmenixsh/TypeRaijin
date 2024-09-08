import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Subcomps.css'
import gitIcon from '../../assets/github.png'

const github = () => {
    return (<footer>
        <img src={gitIcon}> </img>
    </footer>
    )
}

export default github