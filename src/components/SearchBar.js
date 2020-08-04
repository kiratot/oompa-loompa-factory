import React from "react";

const SearchBar = ({ onChange, value }) => {
  console.log(value);
  return (
    <div className="search-bar-container">
      <div className="input-container">
        <input
          placeholder="Search"
          type="search"
          name="search"
          aria-label="Search through oompa loompas"
          value={value}
          onChange={onChange}
        />
        <img src="/search.png" alt="search" />
      </div>
    </div>
  );
};

export default SearchBar;
