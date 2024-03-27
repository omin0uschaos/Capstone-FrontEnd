import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SvgAnimation from '../assets/images/vosanim.svg';
import './Loading.css'

function LoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="loadingContainer">
      <img src={SvgAnimation} alt="Loading..." className="svgAnimation"/>
      <p>Loading...</p>
    </div>
  );
}

export default LoadingPage;
