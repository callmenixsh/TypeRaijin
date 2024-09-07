import { useNavigate } from 'react-router-dom';

const useNavigation = () => {
    const navigate = useNavigate();

    const goToHome = () => navigate('/');
    const goToGameScreen = () => navigate('/gamescreen');
    const goToSettings = () => navigate('/settings');
    const handleQuit = () => {
        console.log('Quit clicked');
    };

    return { goToHome, goToGameScreen, goToSettings, handleQuit };
};

export default useNavigation;