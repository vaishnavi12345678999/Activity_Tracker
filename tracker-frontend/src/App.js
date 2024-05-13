import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState}  from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Dashboard from './components/DashboardPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
