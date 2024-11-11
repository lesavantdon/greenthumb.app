// GreenHouse.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



const GreenHouse = () => {
  const [plants, setPlants] = useState([]);

  // Fetch plant data from your API
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch('/api/v1/plants'); // Adjust the endpoint as needed
        const data = await response.json();
        setPlants(data); // Assuming data is an array of plant objects
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };

    fetchPlants();
  }, []);

  return (
    <div className="greenhouse">
      <h2>Welcome Back To The Greenhouse</h2>
     
      <div className="plant-list">
        {plants.map((plant) => (
          <div
            key={plant.id}
            className="plant-card"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', plant.id); 
            }}
          >
            <Link to={`/plant-profile/${plant.id}`} className="plant-link">
              <h3>{plant.common_name}</h3>
              <p>{plant.scientific_name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GreenHouse;
