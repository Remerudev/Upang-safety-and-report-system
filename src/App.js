import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import UserDashboard from './pages/UserDashboard';
import ReportIncident from './pages/ReportIncident';
import LandingPage from './pages/Landing';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/dashboard" element={isAuthenticated ? <UserDashboard/> : <LandingPage isAuthenticated={false} setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/report" element={isAuthenticated ? <ReportIncident /> : <LandingPage isAuthenticated={false} setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </Router>
  );
}