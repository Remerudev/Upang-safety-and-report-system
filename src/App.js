import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import UserDashboard from './pages/UserDashboard';
import ReportIncident from './pages/ReportIncident';
import LandingPage from './pages/Landing';
import TrackReports from './pages/TrackReports';
import { UserProvider } from './UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  return (
    <Router>
      <UserProvider value={{ userEmail, setUserEmail }}>
      <Routes>
        <Route path='/' element={<LandingPage isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} setUserEmail={setUserEmail} />} />
        <Route path="/dashboard" element={isAuthenticated ? <UserDashboard userEmail={userEmail} /> : <LandingPage isAuthenticated={false} setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/report" element={isAuthenticated ? <ReportIncident userEmail={userEmail} /> : <LandingPage isAuthenticated={false} setIsAuthenticated={setIsAuthenticated} />} />\
        <Route path="/track-reports" element={<ProtectedRoute isAuthenticated={isAuthenticated}><TrackReports/></ProtectedRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/reset-password/:token" element={<ResetPassword isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
      </UserProvider>
    </Router>
  );
}
