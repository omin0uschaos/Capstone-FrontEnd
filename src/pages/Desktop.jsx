import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TaskBar from '../components/taskbar/TaskBar';
import DesktopIcons from '../components/desktop/DesktopIcons';
import './Desktop.css';

function Desktop() {
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      try {
        await axios.get('https://voyatikadb.onrender.com/api/token/validate', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/');
      }
    };

    validateToken();
  }, [navigate]);

  return (
    <div>
      <TaskBar></TaskBar>
      <DesktopIcons></DesktopIcons>
    </div>
  );
}

export default Desktop;
