
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES_LIST } from '../constants';
import { Service } from '../types';

const Services: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const navigate = useNavigate();
  
  const categories = ['All', 'Government', 'Banking', 'Printing', 'Digital'];
  
  const filteredServices = filter === 'All' 
    ? SERVICES_LIST 
    : SERVICES_LIST.filter(s => s.category === filter);

  const handleApplyNow = (serviceId: string) => {
    // Navigate to dashboard where they can find the new application button
    // In a real app we might pass the serviceId as state
    navigate('/dashboard');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Our Services</h1>
          <p className="text-slate-600">Comprehensive digital solutions with the most competitive rates in India.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === cat 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map(service => (
            <div key={service.id} className="bg-white rounded-3xl p-8 border border-slate-200 hover:shadow-2xl transition-all group overflow-hidden relative flex flex-col h-full">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                <i className={`fas ${service.icon} text-9xl -mr-12 -mt-12`}></i>
              </div>
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <i className={`fas ${service.icon} text-3xl`}></i>
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 block">{service.category}</span>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.name}</h3>
              <p className="text-slate-600 mb-8 flex-grow">{service.description}</p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                <div className="text-slate-900 font-bold text-xl">₹{service.price} <span className="text-xs text-slate-400 font-normal">fixed</span></div>
                <button 
                  onClick={() => handleApplyNow(service.id)}
                  className="bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
