import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = (props) => {

  return (
    <div className="nav">
      <Link to="/">
        <h2 className="nav-title">Dave's Bread Club</h2>
      </Link>
      
      <div className="nav-right">
        <div className="search">
          
        </div>
        <Link className="nav-link" to="/" style={{ borderBottomLeftRadius: "10px" }}>
          {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
          Home
        </Link>
        {/* Show the link to the info page and the logout button if the user is logged in */}
        
        {/* Always show this link since the about page is not protected */}
        <Link className="nav-link" to="/about">
          About
        </Link>
        <Link className="nav-link" to="/contact">
          Contact
        </Link>
        <Link className="nav-link" to="/order">
          Order
        </Link>
      </div>
    </div>
  );
};

export default (Nav);
