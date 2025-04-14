import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink instead of Link
import Logo from './Logo';

const Sidebar: React.FC = () => {
  return (
    <div className="d-flex flex-column bg-dark text-white vh-100" style={{ width: '240px', minWidth: '240px' }}>
      <Logo />
      <ul className="nav flex-column mt-3">
        <li className="nav-item">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `nav-link text-white py-2 px-4 ${isActive ? 'bg-primary' : ''}`
            }
          >
            <i className="bi bi-people me-3"></i> Companies
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/contacts" 
            className={({ isActive }) => 
              `nav-link text-white py-2 px-4 ${isActive ? 'bg-primary' : ''}`
            }
          >
            <i className="bi bi-building me-3"></i> Contacts
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
