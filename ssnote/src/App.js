import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/loginpage/LoginPage';
import Dashboard from './pages/dashboard/Dashboard';
import Notepage from './pages/notepage/NotePage';
import Cheatsheets from './pages/dashboard/Cheatsheets';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notebook" element={<Notepage />} />
        <Route path="/cheatsheets" element={<Cheatsheets />} />
      </Routes>
    </Router>
  );
};

export default App;
