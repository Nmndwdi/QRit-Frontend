import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomeScreen from './Components/home/screens/Home';
import AuthScreen from './Components/auth/screens/Auth';
import QrScreen from './Components/qr/screens/Qr';

function CustomNavigator() {
  
  const isAuthenticated = !!localStorage.getItem('x-auth-token');

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/auth" />} />
        <Route exact path="/home" element={<HomeScreen />} />
        <Route exact path="/auth" element={<AuthScreen />} />
        <Route exact path="/qr" element={<QrScreen />} />
      </Routes>
    </Router>
  );
}

export default CustomNavigator;
