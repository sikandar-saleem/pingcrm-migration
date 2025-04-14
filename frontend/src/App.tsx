import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import CompanyHome from './pages/Company/Index';
import ContactsHome from './pages/Contact/Index';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<CompanyHome />} />
          <Route path="/contacts" element={<ContactsHome />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
