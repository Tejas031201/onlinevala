
import React from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white text-xl font-bold mb-4">{BUSINESS_INFO.name}</h3>
            <p className="text-slate-400 mb-6 max-w-md">
              Providing reliable digital, banking, and government documentation services to the Yevla community. 
              Founded by Prashant Sanjay Wagh with a vision of trust and efficiency.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href={`https://wa.me/${BUSINESS_INFO.whatsapp}`} className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href={`tel:${BUSINESS_INFO.phone}`} className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                <i className="fas fa-phone"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">Services</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-blue-500"></i>
                <span>{BUSINESS_INFO.location}</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-3 text-blue-500"></i>
                <span>+91 {BUSINESS_INFO.phone}</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-blue-500"></i>
                <span>{BUSINESS_INFO.email}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved. Designed with trust.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
