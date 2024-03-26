import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Navigator.css';
import NavGPSIcon from '../../assets/images/gpsnavicon.svg';

const Navigator = () => {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [destinationImageUrl, setDestinationImageUrl] = useState('');
  const [divPositions, setDivPositions] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('https://voyatikadb.onrender.com/api/destinations/');
        setDestinations(response.data);
        generateRandomPositionsAndSizes(response.data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };

    fetchDestinations();
  }, []);

  const generateRandomPositionsAndSizes = (destinationsData) => {
    let positions = [];
    const sizeClasses = ['locationSize1', 'locationSize2', 'locationSize3', 'locationSize4'];
    destinationsData.forEach(destination => {
      positions.push({
        left: `${Math.random() * 95}%`,
        top: `${Math.random() * 95}%`,
        sizeClass: sizeClasses[Math.floor(Math.random() * sizeClasses.length)],
        destination: destination,
      });
    });
    setDivPositions(positions);
  };

  const fetchDestinationImage = async (destinationId) => {
    try {
      const response = await axios.get(`https://voyatikadb.onrender.com/api/destinations/photo/${destinationId}`);
      setDestinationImageUrl(response.data);
    } catch (error) {
      console.error('Error fetching destination image:', error);
    }
  };

  useEffect(() => {
    if (selectedDestination) {
      fetchDestinationImage(selectedDestination._id);
    }
  }, [selectedDestination]);

  if (selectedDestination) {
    return (
      <div className="destinationDetails">
        <button onClick={() => setSelectedDestination(null)}>Back to Navigator</button>
        <h2>{selectedDestination.destinationName}</h2>
        {destinationImageUrl && <img src={destinationImageUrl} alt={selectedDestination.destinationName} />}
        <p>{selectedDestination.destinationDescription}</p>
      </div>
    );
  }

  return (
    <div className="navigatorContainer">
      <img src={NavGPSIcon} alt="User's Location" className="userLocationIcon" />
      {divPositions.map((pos, index) => (
        <div
          key={index}
          className={`locationDiv ${pos.sizeClass}`}
          style={{ left: pos.left, top: pos.top }}
          onClick={() => setSelectedDestination(pos.destination)}
        ></div>
      ))}
    </div>
  );
};

export default Navigator;
