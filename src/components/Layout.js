import React from "react";

const Layout = ({ children }) => {
  return (
    <div data-testid="layout" className="grid-container">
      {children}
    </div>
  );
};

export default Layout;
