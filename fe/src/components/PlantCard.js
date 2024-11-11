import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PlantCard = ({draggable, onDragStart}) => {
  const { id } = useParams(); // Get plant ID from URL
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    // Fetch plant details from API using the plant ID
    axios.get(`/api/plants/${id}`)
      .then(res => setPlant(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!plant) {
    return <div>Loading...</div>;
  }

  return (
    
    <div 
    className="plant-card"
    draggable = {draggable}
    onDragStart={onDragStart}>
      <h2>{plant.common_name}</h2>
      <p><strong>Scientific Name:</strong> {plant.scientific_name}</p>
      <p><strong>Category:</strong> {plant.category}</p>
      <p><strong>Description:</strong> {plant.description}</p>
    </div>
    
  );
};

export default PlantCard;
