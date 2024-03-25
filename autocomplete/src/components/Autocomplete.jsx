import React, { useState, useEffect } from 'react';
import suggestions from '../resources/countryData.json';

function SearchBox() {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);

    const filtered = suggestions.filter(suggestion =>
      suggestion.name.toLowerCase().startsWith(value)
    );
    setFilteredSuggestions(filtered);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="search-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="search-input"
        placeholder="Type here..."
      />
      {inputValue.length > 0 && showSuggestions && (
        <div className="suggestions-container">
          {filteredSuggestions.map((suggestion, index) => (
            <div className="suggestion" key={index}>
              {suggestion.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
