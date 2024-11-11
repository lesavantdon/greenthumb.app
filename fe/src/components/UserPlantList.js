import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlantList from './PlantList'; // Reusing the existing PlantList component

const UserPlantList = () => {
  const [userPlants, setUserPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the user's plants from the backend (assuming you have an endpoint for this)
    const fetchUserPlants = async () => {
      try {
        const response = await axios.get('/api/user/plants'); // Modify this based on your actual API endpoint
        setUserPlants(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user plants:", error);
        setLoading(false);
      }
    };

    fetchUserPlants();
  }, []); // Empty array means this runs only once on component mount

  if (loading) {
    return <p>Loading your plants...</p>;
  }

  return (
    <div className="user-plant-list">
      <h2>Your Greenhouse</h2>
      {userPlants.length > 0 ? (
        <PlantList plants={userPlants} />
      ) : (
        <p>You haven't added any plants to your greenhouse yet.</p>
      )}
    </div>
  );
};

export default UserPlantList;
