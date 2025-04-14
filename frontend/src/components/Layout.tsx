import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="d-flex h-100">
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column">
        <Navbar />
        <div className="bg-light flex-grow-1 p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
