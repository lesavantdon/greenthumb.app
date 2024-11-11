import React, { useState } from 'react';

const PlantList = ({ plants }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const plantsPerPage = 20; 
  const totalPages = Math.ceil(plants.length / plantsPerPage);

  const indexOfLastPlant = currentPage * plantsPerPage;
  const indexOfFirstPlant = indexOfLastPlant - plantsPerPage;
  const currentPlants = plants.slice(indexOfFirstPlant, indexOfLastPlant);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="plant-list">
      {currentPlants.length > 0 ? (
        currentPlants.map((plant, index) => (
          <div key={plant.id} className="plant-card">
            <h3>{plant.common_name}</h3>
            <p>Scientific Name: {plant.scientific_name}</p>
            <p>Genus: {plant.genus}</p>
        
            {index !== plants.length - 1 && <hr />}
          </div>
        ))
      ) : (
        <p>No plants found</p>
      )}
      {/* Pagination Controls */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlantList;
