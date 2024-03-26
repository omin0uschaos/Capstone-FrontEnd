import { useNavigate } from 'react-router-dom';
import './LogoutButton.css'

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <button id='logoutNavButton' onClick={handleLogout}>Log Out</button>
  );
}

export default LogoutButton;
