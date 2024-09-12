import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Page Not Found</h1>
            <p style={{ fontSize: '25px' }}>The page you are looking for does not exist.</p>
            <button className='Play' onClick={() => navigate('/')} style={{ fontSize: '20px', padding: '20px' }}>Go to Home</button>
        </div>
    );
};

export default NotFound;
