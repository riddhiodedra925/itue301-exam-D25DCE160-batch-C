import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand Logo & Name */}
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">
            <span>S</span>
          </div>
          <div className="brand-info">
            <span className="brand-title">ShelfSpace</span>
            <span className="brand-subtitle">College Library</span>
          </div>
        </Link>

        {/* Navigation Links using React Router */}
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink 
                to="/" 
                end 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/books" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                Books
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/borrow" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                Borrow
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
