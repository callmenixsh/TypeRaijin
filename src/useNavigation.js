import { useNavigate } from 'react-router-dom';

const useNavigation = () => {
    const navigate = useNavigate();

    const goToHome = () => navigate('/');
    const goToGameScreen = () => navigate('/gamescreen');
    const goToSettings = () => navigate('/settings');
    const handleQuit = () => {
        // Define quit behavior or redirection here
        console.log('Quit clicked');
        // Example: navigate to a quit confirmation page or perform some logout action
    };

    return { goToHome, goToGameScreen, goToSettings, handleQuit };
};

export default useNavigation;