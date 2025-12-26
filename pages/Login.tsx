
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, UserRole } from '../types';
import { mockBackend } from '../services/mockBackend';
import { BUSINESS_INFO } from '../constants';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Pre-seed an admin account for demo purposes
    if (mobile === '9999999999' && password === 'admin') {
       const admin: User = {
         id: 'admin1',
         name: 'Prashant Wagh (Admin)',
         mobile: '9999999999',
         role: UserRole.ADMIN,
         createdAt: new Date().toISOString()
       };
       onLogin(admin);
       navigate('/admin');
       return;
    }

    const foundUser = mockBackend.findUser(mobile);
    if (foundUser && foundUser.password === password) {
      onLogin(foundUser);
      navigate('/dashboard');
    } else {
      setError('Invalid mobile number or password.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 border border-slate-200">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-6 shadow-lg">
            <i className="fas fa-lock"></i>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">Sign In</h2>
          <p className="text-slate-500 mt-2 text-sm font-medium">Access your {BUSINESS_INFO.name} dashboard</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl font-medium flex items-center">
            <i className="fas fa-exclamation-circle mr-2"></i> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Number</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <i className="fas fa-phone"></i>
              </span>
              <input 
                required
                type="tel" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter 10 digit mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <i className="fas fa-key"></i>
              </span>
              <input 
                required
                type="password" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Your secret password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-sm text-slate-600 cursor-pointer">
              <input type="checkbox" className="rounded text-blue-600" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-sm font-bold text-blue-600 hover:text-blue-700">Forgot Password?</a>
          </div>
          <button 
            type="submit" 
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all shadow-lg"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-slate-600 text-sm">
            Don't have an account? <Link to="/register" className="font-bold text-blue-600 hover:text-blue-700">Register now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
