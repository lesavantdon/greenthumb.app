import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/styles/greenhouse-page.css'; // Adjust path based on where the file is located


const GreenhousePage = () => {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState('');

  // Fetch user's greenhouse data
  useEffect(() => {
    const fetchGreenhouseData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to view your greenhouse.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/greenhouse', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Set the plant details to the state
        setPlants(response.data);
      } catch (error) {
        console.error('Error fetching greenhouse data:', error);
        setError('Error fetching greenhouse data.');
      }
    };

    fetchGreenhouseData();
  }, []);

  // Show error message if there's an issue
  if (error) return <div>{error}</div>;

  // Show loading message if no plants yet
  if (plants.length === 0) return <div>Loading your greenhouse...</div>;

  return (
    <div>
      <h1>Your Greenhouse</h1>
      <div className="greenhouse-container">
        {plants.map((plant) => (
          <div key={plant._id} className="plant-card">
            {/* Check if plant has image(s), and display the first image */}
            <img
              src={plant.images.length > 0 ? plant.images[0] : 'path_to_default_image.jpg'}
              alt={plant.commonName}
              className="plant-image"
            />
              <div className="plant-text">
            <h3>{plant.commonName}</h3>
            <p><strong>Scientific Name:</strong> {plant.scientificName}</p>
            <p><strong>Family:</strong> {plant.family}</p>
            <p><strong>Water Needs:</strong> {plant.waterNeeds}</p>
            <p><strong>Sunlight:</strong> {plant.sunlight}</p>
            <p><strong>Soil Type:</strong> {plant.soilType}</p>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GreenhousePage;
