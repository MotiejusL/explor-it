import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div className="nav-container">
      <nav>
        <ul className="navigation-list">
          <Link to="/">
            <li className="navigation-list-item">Home</li>
          </Link>
          <Link to="/events">
            <li className="navigation-list-item">Events</li>
          </Link>
          <Link to="/expand">
            <li className="navigation-list-item">Expand</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
