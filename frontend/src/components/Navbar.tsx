import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-light bg-white border-bottom py-2 px-4">
      <div className="container-fluid px-0">
        <span className="navbar-text text-dark">Graph8 Corporation</span>
        <div className="dropdown">
          <button className="btn dropdown-toggle d-flex align-items-center" type="button" id="userDropdown" data-bs-toggle="dropdown">
            <span className="me-2">Sikandar Saleem</span>
            <i className="bi bi-chevron-down small"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
