
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, UserRole } from '../types';
import { mockBackend } from '../services/mockBackend';

interface RegisterProps {
  onLogin: (user: User) => void;
}

const Register: React.FC<RegisterProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({ name: '', mobile: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirm) {
      setError('Passwords do not match.');
      return;
    }

    const existing = mockBackend.findUser(formData.mobile);
    if (existing) {
      setError('Mobile number already registered.');
      return;
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      mobile: formData.mobile,
      password: formData.password,
      role: UserRole.USER,
      createdAt: new Date().toISOString()
    };

    mockBackend.saveUser(newUser);
    onLogin(newUser);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 border border-slate-200">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-6 shadow-lg">
            <i className="fas fa-user-plus"></i>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">Create Account</h2>
          <p className="text-slate-500 mt-2 text-sm font-medium">Start your digital journey today</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl font-medium flex items-center">
            <i className="fas fa-exclamation-circle mr-2"></i> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <i className="fas fa-user"></i>
              </span>
              <input 
                required
                type="text" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>
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
                value={formData.mobile}
                onChange={(e) => setFormData({...formData, mobile: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input 
                required
                type="password" 
                className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Min. 6 chars"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Confirm</label>
              <input 
                required
                type="password" 
                className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Confirm"
                value={formData.confirm}
                onChange={(e) => setFormData({...formData, confirm: e.target.value})}
              />
            </div>
          </div>
          <p className="text-[10px] text-slate-400">
            By registering, you agree to our Terms of Service and Privacy Policy.
          </p>
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/50"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-slate-600 text-sm">
            Already have an account? <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
