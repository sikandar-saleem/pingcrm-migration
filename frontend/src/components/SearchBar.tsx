import React, { useState } from 'react';

interface SearchBarProps {
  onSearchChange: (searchTerm: string) => void; 
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearchChange(newSearchTerm);
  };

  return (
    <div className="d-flex mb-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          aria-label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
