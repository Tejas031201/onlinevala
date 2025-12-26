
import React, { useState } from 'react';
import { BUSINESS_INFO } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setFormData({ name: '', phone: '', message: '' });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Get in Touch</h1>
          <p className="text-slate-600">Have a question or need assistance? Reach out to us.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Info Side */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-400">Phone Number</p>
                    <p className="text-slate-900 font-bold">+91 {BUSINESS_INFO.phone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-400">Email Address</p>
                    <p className="text-slate-900 font-bold">{BUSINESS_INFO.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-400">Location</p>
                    <p className="text-slate-900 font-bold">{BUSINESS_INFO.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
              <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span>Mon - Fri</span>
                  <span className="font-bold">09:00 AM - 08:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span>Saturday</span>
                  <span className="font-bold">10:00 AM - 06:00 PM</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Sunday</span>
                  <span className="font-bold">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Number</label>
                    <input 
                      required
                      type="tel" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="+91 XXXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Your Message</label>
                  <textarea 
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/50"
                >
                  Send Message
                </button>
                {sent && (
                  <div className="p-4 bg-green-50 text-green-700 rounded-xl text-center font-medium animate-bounce mt-4">
                    <i className="fas fa-check-circle mr-2"></i> Message sent successfully!
                  </div>
                )}
              </form>
            </div>

            {/* Google Map Placeholder */}
            <div className="mt-12 rounded-3xl overflow-hidden shadow-sm border border-slate-200 h-80 relative">
              <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <i className="fas fa-map-marked-alt text-5xl mb-4"></i>
                  <p className="font-medium">Interactive Map Integration</p>
                  <p className="text-sm">Taluka Yevla, District Nashik</p>
                  <a 
                    href="https://www.google.com/maps/search/Bank+of+Baroda+Yevla" 
                    target="_blank" 
                    className="mt-4 inline-block bg-white px-4 py-2 rounded-lg text-blue-600 font-bold shadow-md hover:bg-blue-50"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
