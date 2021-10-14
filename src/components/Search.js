import React, { useState } from 'react';

function Search({ setQueryText }) {
  const [searchTxt, setSearchTxt] = useState('');
  return (
    <div className="search-wrapper">
      <input
        type="text"
        value={searchTxt}
        onChange={(e) => setSearchTxt(e.target.value)}
      />
      <button
        className="btn search-btn"
        onClick={() => {
          setQueryText(searchTxt);
        }}
      >
        Search
      </button>
      <button
        className="btn"
        onClick={() => {
          setSearchTxt('');
          setQueryText('');
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default Search;
