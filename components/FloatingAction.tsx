
import React from 'react';
import { BUSINESS_INFO } from '../constants';

const FloatingAction: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-4">
      <a
        href={`https://wa.me/${BUSINESS_INFO.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition-all hover:scale-110 active:scale-95 group relative"
      >
        <i className="fab fa-whatsapp text-3xl"></i>
        <span className="absolute right-16 bg-white text-slate-800 px-3 py-1 rounded-lg text-xs font-semibold shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          WhatsApp Us
        </span>
      </a>
      <a
        href={`tel:${BUSINESS_INFO.phone}`}
        className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-blue-700 transition-all hover:scale-110 active:scale-95 group relative"
      >
        <i className="fas fa-phone text-2xl"></i>
        <span className="absolute right-16 bg-white text-slate-800 px-3 py-1 rounded-lg text-xs font-semibold shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Call Now
        </span>
      </a>
    </div>
  );
};

export default FloatingAction;
