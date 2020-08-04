import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="header-full-background"></div>
      <header className="header">
        <div className="title-container">
          <Link to="/">
            <img src="/logo-umpa-loompa.png" alt="logo oompa loompa" />
          </Link>

          <div>Oompa Loompa's Crew</div>
        </div>
      </header>
    </>
  );
};

export default Header;
