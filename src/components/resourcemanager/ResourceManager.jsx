import { useState, useEffect } from 'react';
import axios from 'axios';
import './ResourceManager.css';

function ResourceManager() {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('https://voyatikadb.onrender.com/api/resources');
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredResources = resources.filter((resource) =>
    resource.resourceName.toLowerCase().includes(searchTerm) ||
    resource.resourceType.toLowerCase().includes(searchTerm) ||
    resource.resourceId.includes(searchTerm)
  );

  return (
    <div className="resourceManagerContainer">
      <input
        type="text"
        placeholder="Search by name, type, or ID..."
        onChange={handleSearchChange}
        value={searchTerm}
        className="searchInput"
      />
      <div className="resourceList">
        {filteredResources.map((resource) => (
          <div key={resource._id} className="resourceItem">
            <h3>{resource.resourceName} (ID: {resource.resourceId})</h3>
            <p> <strong>Type:</strong> {resource.resourceType}</p>
            <p><strong>Quantity:</strong> {resource.resourceQuantity}</p>
            <p><strong>Source:</strong> {resource.resourceSource}</p>
            <p><strong>Description:</strong> {resource.resourceDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceManager;
