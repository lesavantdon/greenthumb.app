import React, {useState} from 'react';
import "../assets/styles/Global.css"

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
    const handleInputChange = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);  // Update local state
    onSearch(searchValue);  // Trigger search in parent component
  };
  return (
    <div className = "search-bar-container">
      <input
          type="text"
          placeholder="Search for a plant..."
          value={searchTerm}
          onChange={handleInputChange} 
        className = "search-input"
      />
      <button type='button' className= "search-button">Search</button>
    </div>
  );
};

export default SearchBar;
