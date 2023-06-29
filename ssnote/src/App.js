import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/loginpage/LoginPage';
import Dashboard from './pages/dashboard/Dashboard';
import Notepage from './pages/notepage/NotePage';
import Cheatsheets from './pages/dashboard/Cheatsheets';

require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notebook" element={<Notepage />} />
        <Route path="/cheatsheets" element={<Cheatsheets />} />
      </Routes>
    </Router>
  );
};

export default App;
