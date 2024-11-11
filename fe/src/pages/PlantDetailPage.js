import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlantDetailPage = () => {
    const { id } = useParams(); // Get the plant ID from the URL
    const navigate = useNavigate(); // To navigate to other pages, e.g., login page
    const [plantDetails, setPlantDetails] = useState(null);
    const [error, setError] = useState('');
  
    // Add plant to greenhouse function
    const addToGreenhouse = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please log in to add plants to your greenhouse.");
            navigate('/login'); // Redirect to login if user is not signed in
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:5000/api/greenhouse/add`,
                { plantId: id },  // Use the plant ID here
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

    useEffect(() => {
        const fetchPlantDetails = async () => {
            try {
                // Update this URL to call your back-end server
                const response = await axios.get(`http://localhost:5000/api/trefle/plants/${id}`);
                setPlantDetails(response.data.data); // Access the 'data' property
            } catch (error) {
                setError('Error fetching plant details.');
                console.error('Error fetching plant details:', error);
            }
        };

        fetchPlantDetails();
    }, [id]); // Only re-run the effect if id changes

    if (error) return <div>{error}</div>;
    if (!plantDetails) return <div>Loading...</div>;

    return (
        <div>
            <h1>{plantDetails.common_name}</h1>
            <img src={plantDetails.image_url} alt={plantDetails.common_name} />
            <p><strong>Scientific Name:</strong> {plantDetails.scientific_name}</p>
            <p><strong>Author:</strong> {plantDetails.author}</p>
            <p><strong>Genus:</strong> {plantDetails.genus.name}</p>
            <p><strong>Family:</strong> {plantDetails.family.name}</p>
            {/* Display other relevant plant details here */}
            <button onClick={addToGreenhouse} style={{ padding: '10px' }}>
                Add to Greenhouse
            </button>
        </div>
    );
};

export default PlantDetailPage;
