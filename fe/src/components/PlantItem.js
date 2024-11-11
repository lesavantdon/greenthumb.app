import React from 'react';
import { Link } from 'react-router-dom';

const PlantItem = ({ plant }) => {
  return (
    <div className="plant-item">
      <Link to={`/plant-profile/${plant.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h3>{plant.common_name}</h3>
        <p>Scientific Name: {plant.scientific_name}</p>
        <p>Category: {plant.family_common_name}</p>
      </Link>
    </div>
  );
};

export default PlantItem;
