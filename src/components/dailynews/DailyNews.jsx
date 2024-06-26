import axios from 'axios';
import { useState, useEffect } from 'react';
import './DailyNews.css';

function DailyNews() {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getPDTDate = () => {
    const now = new Date();
    const pdtOffset = 7 * 60; 
    const localOffset = now.getTimezoneOffset(); 
    const pdtDate = new Date(now.getTime() - ((pdtOffset + localOffset) * 60 * 1000));
    return pdtDate.toISOString().slice(0, 10);
  };

  const [currentDate, setCurrentDate] = useState(getPDTDate());

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.nasa.gov/planetary/apod', {
          params: {
            api_key: import.meta.env.VITE_NASA_API_KEY,
            date: currentDate,
          },
        });
        setApodData(response.data);
      } catch (error) {
        setError('Failed to fetch the data from NASA');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentDate]);

  const handlePreviousDay = () => {
    const previousDay = new Date(currentDate);
    previousDay.setDate(previousDay.getDate() - 1);
    setCurrentDate(previousDay.toISOString().slice(0, 10));
  };

  const handleNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const initialPDTDate = new Date(getPDTDate());
    if (nextDay > initialPDTDate) {
      return;
    }
    setCurrentDate(nextDay.toISOString().slice(0, 10));
  };

  const formatText = (text) => {
    const sentences = text.split(/(?<=[.!?])\s+/);
    return sentences.reduce((acc, sentence, index) => {
      acc.push(sentence);
      if ((index + 1) % 3 === 0) acc.push(<br key={index} />);
      return acc;
    }, []);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dailyNewsContent">
      <h1>Daily News</h1>
      <sub>Provided by Nasa</sub>
      <div className="newsNavigationButtons">
        <button onClick={handlePreviousDay}>Prev</button>
        <button onClick={handleNextDay} disabled={new Date(currentDate).toISOString().slice(0, 10) === getPDTDate()}>Next</button>
      </div>
      {apodData && (
        <>
          <h3>{apodData.title} - {currentDate}</h3>
          {apodData.media_type === 'video' ? (
            <iframe
              title="nasa-video"
              src={apodData.url}
              allow="encrypted-media"
              allowFullScreen
              className="apodVideo"
            ></iframe>
          ) : (
            <img src={apodData.url} alt={apodData.title} className="apodImage" />
          )}
          <p>{formatText(apodData.explanation)}</p>
        </>
      )}
    </div>
  );
}

export default DailyNews;
