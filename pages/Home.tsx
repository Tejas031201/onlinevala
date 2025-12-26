
import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES_LIST, BUSINESS_INFO } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative bg-slate-900 overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://picsum.photos/1600/900?grayscale" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6">
              Empowering India with <br/>
              <span className="text-blue-500">Premium Digital Services</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 mb-10">
              {BUSINESS_INFO.name} is your one-stop hub for all digital, banking, and government documentation needs. Fast, reliable, and trustworthy.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/services" 
                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/50"
              >
                View Services
              </Link>
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-100 transition-all shadow-lg"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-1">1000+</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest font-semibold">Happy Clients</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-1">50+</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest font-semibold">Daily Services</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-1">99%</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest font-semibold">Success Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-1">Yevla</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest font-semibold">Prime Location</div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Core Digital Services</h2>
            <p className="text-slate-600 max-w-xl mx-auto">We provide a wide range of essential services to make your digital tasks effortless.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES_LIST.slice(0, 3).map((service) => (
              <div key={service.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <i className={`fas ${service.icon} text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.name}</h3>
                <p className="text-slate-600 mb-6">{service.description}</p>
                <div className="text-blue-600 font-semibold flex items-center group-hover:translate-x-2 transition-transform cursor-pointer">
                  Learn More <i className="fas fa-arrow-right ml-2 text-sm"></i>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="text-slate-600 hover:text-blue-600 font-medium underline">
              Browse All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">Our Excellence</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              Why people trust <br/>
              {BUSINESS_INFO.name}
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Fast Processing', text: 'We understand the value of your time and process documents with maximum speed.' },
                { title: 'Secure Handling', text: 'Your personal data and documents are handled with the highest level of security.' },
                { title: 'Expert Guidance', text: 'Prashant and the team provide professional advice on all government procedures.' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-check text-xs"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-slate-600 text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-blue-600 rounded-3xl rotate-3 absolute inset-0 -z-10 opacity-10"></div>
            <img 
              src="https://picsum.photos/600/600?nature" 
              alt="Team at work" 
              className="rounded-3xl shadow-2xl relative z-0"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
