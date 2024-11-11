import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../assets/styles/FilterByCategory.css';

const PlantFilter = () => {
  const [plants, setPlants] = useState([]);
  const [genus, setGenus] = useState('');
  const [ediblePart, setEdiblePart] = useState('');
  const [growthForm, setGrowthForm] = useState('');
  const [distributions, setDistributions] = useState('');

  // Using useCallback to memoize the fetchPlants function
  const fetchPlants = useCallback(() => {
    // API call with filters
    axios
      .get('http://localhost:5000/plants', {  // Updated to full backend URL
        params: {
          genus,
          edible_part: ediblePart,
          growth_form: growthForm,
          distributions,
        },
      })
      .then((res) => {
        setPlants(res.data); // Update plant data in state
      })
      .catch((err) => console.error(err));
  }, [genus, ediblePart, growthForm, distributions]); // Dependencies that trigger the function

  useEffect(() => {
    fetchPlants(); // Fetch plants when filters change
  }, [fetchPlants]); // Only runs when fetchPlants changes (which is memoized)

  return (
    <div className="title">
      <div className="filter-container">
        <div className="title">
          <h3>Filter Plants:</h3>
        </div>

        {/* Distribution Input */}
        <label htmlFor="distributions"></label>
        <input
          type="text"
          id="distributions"
          value={distributions}
          onChange={(e) => setDistributions(e.target.value)}
          placeholder="Enter Region"
        />

        {/* Genus Input */}
        <label htmlFor="genus"></label>
        <input
          type="text"
          id="genus"
          value={genus}
          onChange={(e) => setGenus(e.target.value)}
          placeholder="Enter Genus"
        />

        {/* Edible Part Dropdown */}
        <label htmlFor="ediblePart"></label>
        <select
          id="ediblePart"
          value={ediblePart}
          onChange={(e) => setEdiblePart(e.target.value)}
        >
          <option value="">-- Select Edible Part --</option>
          <option value="roots">Roots</option>
          <option value="leaves">Leaves</option>
          <option value="fruits">Fruits</option>
        </select>

        {/* Growth Form Dropdown */}
        <label htmlFor="growthForm"></label>
        <select
          id="growthForm"
          value={growthForm}
          onChange={(e) => setGrowthForm(e.target.value)}
        >
          <option value="">-- Select Growth Form --</option>
          <option value="shrub">Shrub</option>
          <option value="tree">Tree</option>
          <option value="herb">Herb</option>
        </select>

        {/* Plant List Display */}
        <div className="plant-list">
          {plants.length > 0 ? (
            plants.map((plant) => (
              <div key={plant.id} className="plant-card">
                <h3>{plant.common_name}</h3>
                <p>Scientific Name: {plant.scientific_name}</p>
                <p>Genus: {plant.genus}</p>
                <p>Growth Form: {plant.growth_form}</p>
                <p>Edible Part: {plant.edible_part.join(', ')}</p>
              </div>
            ))
          ) : (
            <p>No plants found based on the selected filters</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantFilter;
