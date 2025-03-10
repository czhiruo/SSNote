import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginpage/LoginPage";
import Dashboard from "./pages/dashboard/Dashboard";
import Notepage from "./pages/notepage/NotePage";
import Settings from "./pages/dashboard/Settings";
import SignUp from "./pages/loginpage/SignUp";
import ForgotPassword from "./pages/loginpage/ForgotPassword";
import AccountDeleted from "./pages/dashboard/AccountDeleted";
import DisplayContent from "./pages/notepage/DisplayContent";

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/account-deleted" element={<AccountDeleted />} />
        <Route path="/notebook/:noteTitle" element={<Notepage />} />
        <Route path="/filteredData/:noteTitle" element={<DisplayContent />} />
        </Routes>
    </Router>
  );
};

export default App;
