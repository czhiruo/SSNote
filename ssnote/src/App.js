import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/loginpage/LoginPage';
import Dashboard from './pages/dashboard/Dashboard';
import Notepage from './pages/notepage/NotePage';
import Cheatsheets from './pages/dashboard/Cheatsheets';
import Profile from './pages/dashboard/Profile';
import Settings from './pages/dashboard/Settings';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notebook" element={<Notepage />} />
        <Route path="/cheatsheets" element={<Cheatsheets />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;
