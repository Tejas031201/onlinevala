
import React from 'react';
import { BUSINESS_INFO } from '../constants';

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-24 sm:py-32">
        <div className="text-center mb-20">
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl mb-6">Our Story</h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-600">
            Founded on the principles of integrity and community service, {BUSINESS_INFO.name} has become a beacon of digital accessibility in Yevla.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">The Visionary</h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              <span className="font-bold text-blue-600">{BUSINESS_INFO.founder}</span> started {BUSINESS_INFO.name} with a single mission: 
              to bridge the gap between complex government procedures and the common citizen.
            </p>
            <p className="text-slate-600 mb-8">
              With years of experience in digital documentation and online services, Prashant has built a team that understands local needs 
              while maintaining professional standards.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="text-blue-600 font-bold mb-2">Our Mission</div>
                <div className="text-sm text-slate-600">To simplify digital life for every individual in Yevla through dedicated support.</div>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="text-blue-600 font-bold mb-2">Our Values</div>
                <div className="text-sm text-slate-600">Trust, Transparency, and Timeliness are at the core of everything we do.</div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img 
              src="https://picsum.photos/800/800?office" 
              alt="Office" 
              className="rounded-3xl shadow-2xl"
            />
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2rem] p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Better Service?</h2>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto">
            Join thousands of satisfied customers who trust Prashant and {BUSINESS_INFO.name} for their essential documents.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href={`tel:${BUSINESS_INFO.phone}`} className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-colors flex items-center justify-center">
              <i className="fas fa-phone mr-2"></i> Contact Now
            </a>
            <a href={`https://wa.me/${BUSINESS_INFO.whatsapp}`} className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center justify-center">
              <i className="fab fa-whatsapp mr-2 text-xl"></i> WhatsApp Message
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
