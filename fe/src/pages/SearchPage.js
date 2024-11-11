// src/pages/SearchPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchPage = () => {
  const [commonName, setCommonName] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/plants/search?commonName=${commonName}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching plants:', error);
      setResults([]);
    }
  };

  const addToGreenhouse = async (plantId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please log in to add plants to your greenhouse.");
      navigate('/login'); // Redirect to login if user is not signed in
      return;
    }
    console.log("Token from localStorage:", localStorage.getItem('token'));


    try {
      const response = await axios.post(
        `http://localhost:5000/api/greenhouse/add`,
        { plantId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message || "Plant added to greenhouse!");
    } catch (error) {
      console.error("Error adding plant to greenhouse:", error.message);
      alert("Error adding plant. Please try again.");
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for plants..."
          value={commonName}
          onChange={(e) => setCommonName(e.target.value)}
          style={{ width: '80%', padding: '10px', margin: '20px 0' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>
          Search
        </button>
      </form>
      <ul>
        {results.map((plant) => (
          <li key={plant.trefleId}> 
            <Link to={`/plants/${plant.trefleId}`}>
              {plant.commonName} - {plant.scientificName}
            </Link>
            <button
              onClick={() => addToGreenhouse(plant.trefleId)}
              style={{ padding: '5px 5px', marginLeft: '10px' }}
            >
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
