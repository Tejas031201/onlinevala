
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { User, UserRole } from './types';
import { mockBackend } from './services/mockBackend';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingAction from './components/FloatingAction';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('om_sai_session');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('om_sai_session', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('om_sai_session');
  };

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} 
            />
            <Route 
              path="/register" 
              element={user ? <Navigate to="/dashboard" /> : <Register onLogin={handleLogin} />} 
            />
            <Route 
              path="/dashboard" 
              element={
                user 
                  ? (user.role === UserRole.ADMIN ? <Navigate to="/admin" /> : <UserDashboard user={user} />)
                  : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/admin" 
              element={
                user?.role === UserRole.ADMIN 
                  ? <AdminDashboard user={user} /> 
                  : <Navigate to="/login" />
              } 
            />
          </Routes>
        </main>
        <Footer />
        <FloatingAction />
      </div>
    </HashRouter>
  );
};

export default App;
