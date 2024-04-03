import { useState, useEffect } from "react";
import axios from "axios";
import './MissionLog.css';

function MissionLog() {
    const [missions, setMissions] = useState([]);

    useEffect(() => {
        const fetchMissions = async () => {
            try {
                const response = await axios.get('https://voyatikadb.onrender.com/api/missions');
                setMissions(response.data);
            } catch (error) {
                console.error('Error fetching missions:', error);
            }
        };

        fetchMissions();
    }, []);


  return (
    <div className="missionLogContainer">
        <h2>Mission Log</h2>
        {missions.map((mission) => (
            <div key={mission._id} className="missionItem">
                <h3>{mission.MissionObjective}</h3>
                <p><strong>Date Assigned:</strong> {mission.DateAssigned}</p>
                <p><strong>Date Completed:</strong> {mission.DateCompleted}</p>
                <p><strong>Mission Difficulty:</strong> {mission.MissionDifficulty}</p>
                <p><strong>Mission Details:</strong> {mission.MissionDetails}</p>
                <p><strong>Crew:</strong> {mission.CrewUsernames}</p>
            </div>
     ))}
    
    
    </div>
  )
}

export default MissionLog