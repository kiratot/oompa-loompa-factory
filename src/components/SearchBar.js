import React from "react";

const SearchBar = ({ onChange, value }) => {
  console.log(value);
  return (
    <div data-testid="searchbar" className="search-bar-container">
      <div className="input-container">
        <input
          placeholder="Search"
          type="search"
          name="search"
          aria-label="search-input"
          value={value}
          onChange={onChange}
        />
        <img src="/search.png" alt="search" />
      </div>
    </div>
  );
};

export default SearchBar;
