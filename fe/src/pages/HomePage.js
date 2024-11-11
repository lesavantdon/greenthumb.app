import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import PlantList from '../components/PlantList';

export const HomePage = () => {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPlants, setTotalPlants] = useState(0); // Total number of plants
  
  const plantsPerPage = 20; // Number of plants per page

  const fetchPlants = (page = 1) => {
    axios
      .get(`http://localhost:5000/plants?page=${page}`)
      .then((res) => {
        console.log(res.data); // Log the entire response to check structure
        if (res.data && Array.isArray(res.data.data)) {
          setTotalPlants(res.data.meta.total); // Set total number of plants
          setPlants(res.data.data);  // Update state with the data array
          setFilteredPlants(res.data.data);  // Initially, show all plants
        } else {
          setPlants([]);
          setFilteredPlants([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setPlants([]);
        setFilteredPlants([]);
      });
  };

  // Fetch plants on initial load or page change
  useEffect(() => {
    fetchPlants(currentPage);
  }, [currentPage]);

  const handleSearch = (searchValue) => {
    if (Array.isArray(plants)) {
      const filtered = plants.filter((plant) =>
        plant.common_name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredPlants(filtered);  // Update the filtered list based on search term
    }
  };

  // Calculate total pages based on total plants and plants per page
  const totalPages = Math.ceil(totalPlants / plantsPerPage);
  const [startPage, setStartPage] = useState(1); // Track the start page of the current range

  // Handle Next and Previous Buttons
  const handleNext = () => {
    if (startPage + 3 <= totalPages) {
      setStartPage(startPage + 3);
    }
  };

  const handlePrevious = () => {
    if (startPage - 3 > 0) {
      setStartPage(startPage - 3);
    }
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome To The GreenThumb App</h1>
        <p>Your Personal Plant Care Assistant</p>
        <p>This Search functionality works one page at a time,and is purely to browse  availabe plants from the Trefle API</p>
        <p>Go to the Search Link on the NavBar to utilize </p>
      </div>
      <SearchBar onSearch={handleSearch} />
      <PlantList plants={filteredPlants} />

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={handlePrevious} disabled={startPage === 1}>
          &lt; {/* Left arrow for previous */}
        </button>
        {Array.from({ length: Math.min(3, totalPages - startPage + 1) }, (_, i) => (
          <button
            key={startPage + i}
            onClick={() => setCurrentPage(startPage + i)}
            className={currentPage === startPage + i ? 'active' : ''}
          >
            {startPage + i}
          </button>
        ))}
        <button onClick={handleNext} disabled={startPage + 3 > totalPages}>
          &gt; {/* Right arrow for next */}
        </button>
      </div>
    </div>
  );
};
