import React from "react";

const Grid = ({ children }) => {
  return (
    <div data-testid="grid" className="oompa-loompa-grid">
      {children}
    </div>
  );
};

export default Grid;
