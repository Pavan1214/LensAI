import React from "react";
import "../CssFiles/Navbar.css";

// The Navbar now accepts props to control the search input
const Navbar = ({ searchTerm, onSearchChange }) => {
  return (
    <nav  data-aos="fade-down" data-aos-duration="1500" className="navbar">
      <div className="nav-con1">
        <div className="nav-l">
          <a href="#home"><h4>Home</h4></a>
          <a href="#contact-about"><h4>Contact</h4></a>
          <a href="#contact-about"><h4>About</h4></a>
        </div>
        <div className="box1">
          <div className="search-material">
            <input 
              type="text" 
              placeholder="Search by title or description..." 
              value={searchTerm}
              onChange={onSearchChange}
            />
          </div>
        </div>
        <div className="nav-r">
          <a href=""><img src="log.png" alt="" /></a>
        </div>
      </div>
      <div className="search2">
         <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={onSearchChange}
          />
      </div>
    </nav>
  );
};

export default Navbar;