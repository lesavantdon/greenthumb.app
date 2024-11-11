// src/pages/PlantList.js
import React from 'react';

const SearchPlant = ({ plants }) => {
  return (
    <div>
      {plants.length > 0 ? (
        plants.map((plant) => (
          <div key={plant._id}>
            <h3>{plant.name}</h3>
            <p>{plant.description}</p>
          </div>
        ))
      ) : (
        <p>No plants found.</p>
      )}
    </div>
  );
};

export default SearchPlant;
