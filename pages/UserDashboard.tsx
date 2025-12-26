
import React, { useState, useEffect } from 'react';
import { User, Application, ApplicationStatus, Service } from '../types';
import { mockBackend } from '../services/mockBackend';
import { SERVICES_LIST, BUSINESS_INFO } from '../constants';
import { getAIHelp } from '../services/geminiService';

interface UserDashboardProps {
  user: User;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user }) => {
  const [apps, setApps] = useState<Application[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: user.name,
    email: '',
    aadhar: '',
    pan: '',
    notes: ''
  });
  
  // Aadhaar to PAN tool state
  const [aadharInput, setAadharInput] = useState('');
  const [panResult, setPanResult] = useState<string | null>(null);
  const [lookupLoading, setLookupLoading] = useState(false);

  // AI State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    setApps(mockBackend.getUserApplications(user.id));
  }, [user.id]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    const newApp = mockBackend.createApplication({
      userId: user.id,
      userName: formData.name, // Use provided name in form
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      amount: selectedService.price,
      notes: formData.notes,
      clientEmail: formData.email,
      clientAadhar: formData.aadhar,
      clientPan: formData.pan
    });

    setApps([newApp, ...apps]);
    setShowForm(false);
    
    // Notify Admin via WhatsApp with full details
    const message = `*New Service Request - ${BUSINESS_INFO.name}*%0A%0A` +
      `*Service:* ${selectedService.name}%0A` +
      `*Amount:* ₹${selectedService.price}%0A%0A` +
      `*Client Name:* ${formData.name}%0A` +
      `*Mobile:* ${user.mobile}%0A` +
      `*Email:* ${formData.email || 'N/A'}%0A` +
      `*Aadhaar:* ${formData.aadhar || 'N/A'}%0A` +
      `*PAN:* ${formData.pan || 'N/A'}%0A` +
      `*Notes:* ${formData.notes || 'N/A'}%0A%0A` +
      `*Request ID:* ${newApp.id}%0A%0A` +
      `_Sent via ${BUSINESS_INFO.name} Portal_`;

    const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${message}`;
    
    // Reset form
    setSelectedService(null);
    setFormData({ name: user.name, email: '', aadhar: '', pan: '', notes: '' });
    
    // Inform user and redirect
    alert('Application submitted! Redirecting to notify Admin via WhatsApp...');
    window.open(whatsappUrl, '_blank');
  };

  const handleAiAsk = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    setAiResponse('');
    const resp = await getAIHelp(aiPrompt);
    setAiResponse(resp || "No response received.");
    setAiLoading(false);
  };

  const handlePanLookup = () => {
    if (aadharInput.length !== 12) {
      alert("Please enter a valid 12-digit Aadhaar number");
      return;
    }
    setLookupLoading(true);
    setPanResult(null);
    
    // Simulate API delay
    setTimeout(() => {
      // Mocked logic: generate a deterministic PAN based on the Aadhar for demo
      const lastFour = aadharInput.slice(-4);
      const mockPan = `ABCDE${lastFour}F`;
      setPanResult(mockPan);
      setLookupLoading(false);
    }, 1500);
  };

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case ApplicationStatus.PENDING: return 'bg-yellow-100 text-yellow-800';
      case ApplicationStatus.APPROVED: return 'bg-blue-100 text-blue-800';
      case ApplicationStatus.COMPLETED: return 'bg-green-100 text-green-800';
      case ApplicationStatus.REJECTED: return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Welcome, {user.name}</h1>
            <p className="text-slate-500">Manage your digital applications and documents</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center"
          >
            <i className="fas fa-plus-circle mr-2"></i> New Application
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Application List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Utility Tool: Aadhaar to PAN */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 shadow-xl text-white">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                  <i className="fas fa-link text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold">PAN-Aadhaar Utility</h3>
                  <p className="text-blue-100 text-sm">Check linked PAN status directly from Aadhaar</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="text" 
                  maxLength={12}
                  placeholder="Enter 12-digit Aadhaar Number"
                  className="flex-grow bg-white/10 border border-white/20 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder:text-blue-200"
                  value={aadharInput}
                  onChange={(e) => setAadharInput(e.target.value.replace(/\D/g, ''))}
                />
                <button 
                  onClick={handlePanLookup}
                  disabled={lookupLoading}
                  className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center justify-center disabled:opacity-70"
                >
                  {lookupLoading ? <i className="fas fa-spinner fa-spin mr-2"></i> : <i className="fas fa-search mr-2"></i>}
                  Find PAN
                </button>
              </div>

              {panResult && (
                <div className="mt-6 p-4 bg-white/10 rounded-2xl animate-in fade-in slide-in-from-top-2">
                  <div className="text-xs text-blue-100 mb-1">Linked PAN Number:</div>
                  <div className="text-2xl font-mono font-bold tracking-widest">{panResult}</div>
                  <div className="mt-2 text-[10px] text-blue-200 flex items-center">
                    <i className="fas fa-info-circle mr-1"></i> This is a simulated lookup for demonstration purposes.
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <i className="fas fa-history mr-2 text-blue-600"></i> Recent Applications
              </h3>
              
              {apps.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <i className="fas fa-folder-open text-5xl mb-4 opacity-20"></i>
                  <p>You haven't made any applications yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {apps.map(app => (
                    <div key={app.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-white border border-transparent hover:border-slate-200 transition-all">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600">
                          <i className="fas fa-file-invoice"></i>
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{app.serviceName}</div>
                          <div className="text-xs text-slate-400">ID: {app.id} • {new Date(app.createdAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                        <div className="text-sm font-bold text-slate-900 mt-1">₹{app.amount}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Quick Stats & AI Help */}
          <div className="space-y-8">
            <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-lg font-bold mb-6">Application Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-2xl">
                  <div className="text-2xl font-bold">{apps.length}</div>
                  <div className="text-xs text-slate-400">Total</div>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl">
                  <div className="text-2xl font-bold">{apps.filter(a => a.status === ApplicationStatus.PENDING).length}</div>
                  <div className="text-xs text-slate-400">Pending</div>
                </div>
              </div>
            </div>

            {/* AI Assistant */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mr-3">
                  <i className="fas fa-robot"></i>
                </div>
                <h3 className="font-bold text-slate-900">AI Support Assistant</h3>
              </div>
              <p className="text-xs text-slate-500 mb-4">Ask about document requirements or service procedures.</p>
              
              <div className="space-y-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="e.g., Documents for PAN?"
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAiAsk()}
                  />
                  <button 
                    disabled={aiLoading}
                    onClick={handleAiAsk}
                    className="absolute right-2 top-1.5 p-1.5 text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
                  >
                    {aiLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-paper-plane"></i>}
                  </button>
                </div>
                {aiResponse && (
                  <div className="bg-indigo-50 p-4 rounded-xl text-xs text-indigo-800 animate-in fade-in slide-in-from-bottom-2">
                    {aiResponse}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Application Form */}
        {showForm && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowForm(false)}></div>
            <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl p-8 md:p-10 animate-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh]">
              <button 
                onClick={() => setShowForm(false)}
                className="absolute right-8 top-8 text-slate-400 hover:text-slate-600"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
              
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Service Request Form</h2>
              <p className="text-slate-500 mb-8 text-sm">Please fill in the details. After submission, you will be redirected to WhatsApp.</p>
              
              <form onSubmit={handleApply} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Select Service</label>
                  <select 
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setSelectedService(SERVICES_LIST.find(s => s.id === e.target.value) || null)}
                  >
                    <option value="">-- Choose a service --</option>
                    {SERVICES_LIST.map(s => (
                      <option key={s.id} value={s.id}>{s.name} - ₹{s.price}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Optional"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Aadhaar Number</label>
                    <input 
                      type="text" 
                      maxLength={12}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="12 digit number"
                      value={formData.aadhar}
                      onChange={(e) => setFormData({...formData, aadhar: e.target.value.replace(/\D/g, '')})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">PAN Number</label>
                    <input 
                      type="text" 
                      maxLength={10}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      placeholder="ABCDE1234F"
                      value={formData.pan}
                      onChange={(e) => setFormData({...formData, pan: e.target.value.toUpperCase()})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Additional Notes</label>
                  <textarea 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                    placeholder="Specific requirements or questions..."
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={!selectedService}
                  className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-500/30 disabled:opacity-50 transition-all mt-4"
                >
                  Submit & WhatsApp Admin
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
