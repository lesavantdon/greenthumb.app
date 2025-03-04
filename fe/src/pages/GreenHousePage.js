import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/styles/greenhouse-page.css'; // Adjust path based on where the file is located

const GreenhousePage = () => {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState('');
  const [newPlant, setNewPlant] = useState({
    commonName: '',
    scientificName: '',
    family: '',
    waterNeeds: '',
    sunlight: '',
    soilType: '',
  });

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
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log("API Response:", response.data); // Debugging step
        if (Array.isArray(response.data)) {
          setPlants(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
          setPlants([]);
        }
      } catch (error) {
        console.error('Error fetching greenhouse data:', error);
        setPlants([]); // Prevents map() crash
      }
    };
  
    fetchGreenhouseData();
  }, []);
  

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewPlant({ ...newPlant, [e.target.name]: e.target.value });
  };

  // Handle adding a new plant
  const handleAddPlant = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please log in to add plants.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/greenhouse/add',
        { plantData: newPlant },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPlants([...plants, response.data.greenhouse[response.data.greenhouse.length - 1]]);
      setNewPlant({ commonName: '', scientificName: '', family: '', waterNeeds: '', sunlight: '', soilType: '' });
    } catch (error) {
      console.error('Error adding plant:', error);
      setError('Failed to add plant.');
    }
  };

  return (
    <div>
      <h1>Your Greenhouse</h1>

      {error && <div className="error-message">{error}</div>}

      {plants.length === 0 ? (
        <div>
          <p>Your greenhouse is empty. Start by adding some plants!</p>
          <PlantForm newPlant={newPlant} handleInputChange={handleInputChange} handleAddPlant={handleAddPlant} />
        </div>
      ) : (
        <div className="greenhouse-container">
          {plants.map((plant) => (
            <div key={plant._id} className="plant-card">
              <img
                src={plant.images?.length > 0 ? plant.images[0] : 'path_to_default_image.jpg'}
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
      )}

      {/* Always show the form to add new plants */}
      <PlantForm newPlant={newPlant} handleInputChange={handleInputChange} handleAddPlant={handleAddPlant} />
    </div>
  );
};

// Separate form component for adding plants
const PlantForm = ({ newPlant, handleInputChange, handleAddPlant }) => (
  <form onSubmit={handleAddPlant} className="plant-form">
    <input type="text" name="commonName" placeholder="Common Name" value={newPlant.commonName} onChange={handleInputChange} required />
    <input type="text" name="scientificName" placeholder="Scientific Name" value={newPlant.scientificName} onChange={handleInputChange} required />
    <input type="text" name="family" placeholder="Family" value={newPlant.family} onChange={handleInputChange} />
    <input type="text" name="waterNeeds" placeholder="Water Needs" value={newPlant.waterNeeds} onChange={handleInputChange} />
    <input type="text" name="sunlight" placeholder="Sunlight" value={newPlant.sunlight} onChange={handleInputChange} />
    <input type="text" name="soilType" placeholder="Soil Type" value={newPlant.soilType} onChange={handleInputChange} />
    <button type="submit">Add Plant</button>
  </form>
);

export default GreenhousePage;
