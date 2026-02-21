import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import MainDashboard from './Pages/Dashboard/MainDashboard';
import LoginPage from './Pages/Login/LoginPage';
import SignupPage from './Pages/Login/SignupPage';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* Catch-all for 404s can be added here */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
