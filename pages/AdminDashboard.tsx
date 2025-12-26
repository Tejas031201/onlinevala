
import React, { useState, useEffect } from 'react';
import { User, Application, ApplicationStatus, UserRole } from '../types';
import { mockBackend } from '../services/mockBackend';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface AdminDashboardProps {
  user: User;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const [apps, setApps] = useState<Application[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<'applications' | 'users'>('applications');

  useEffect(() => {
    setApps(mockBackend.getApplications());
    setUsers(mockBackend.getUsers());
  }, []);

  const handleStatusChange = (id: string, newStatus: ApplicationStatus) => {
    mockBackend.updateApplicationStatus(id, newStatus);
    setApps(mockBackend.getApplications());
  };

  const statsData = [
    { name: 'Pending', count: apps.filter(a => a.status === ApplicationStatus.PENDING).length, color: '#eab308' },
    { name: 'Approved', count: apps.filter(a => a.status === ApplicationStatus.APPROVED).length, color: '#3b82f6' },
    { name: 'Completed', count: apps.filter(a => a.status === ApplicationStatus.COMPLETED).length, color: '#22c55e' },
    { name: 'Rejected', count: apps.filter(a => a.status === ApplicationStatus.REJECTED).length, color: '#ef4444' },
  ];

  const totalRevenue = apps.reduce((sum, app) => sum + app.amount, 0);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Admin Control Panel</h1>
            <p className="text-slate-500">Managing {apps.length} requests and {users.length} users</p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setActiveTab('applications')}
              className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'applications' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
            >
              Applications
            </button>
            <button 
              onClick={() => setActiveTab('users')}
              className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'users' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
            >
              Users
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Total Requests</div>
            <div className="text-4xl font-extrabold text-slate-900">{apps.length}</div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Total Users</div>
            <div className="text-4xl font-extrabold text-slate-900">{users.length}</div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Total Revenue</div>
            <div className="text-4xl font-extrabold text-blue-600">₹{totalRevenue}</div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Success Rate</div>
            <div className="text-4xl font-extrabold text-green-600">
              {apps.length > 0 ? Math.round((apps.filter(a => a.status === ApplicationStatus.COMPLETED).length / apps.length) * 100) : 0}%
            </div>
          </div>
        </div>

        {activeTab === 'applications' ? (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-lg">Manage Applications</h3>
                  <div className="relative">
                    <input type="text" placeholder="Search ID..." className="text-sm px-4 py-2 bg-slate-50 border rounded-lg focus:outline-none" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-400 text-xs uppercase font-bold tracking-widest">
                      <tr>
                        <th className="px-6 py-4">Application</th>
                        <th className="px-6 py-4">User</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-sm">
                      {apps.map(app => (
                        <tr key={app.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-900">{app.serviceName}</div>
                            <div className="text-xs text-slate-400">ID: {app.id}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-slate-700">{app.userName}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              app.status === ApplicationStatus.PENDING ? 'bg-yellow-100 text-yellow-800' :
                              app.status === ApplicationStatus.APPROVED ? 'bg-blue-100 text-blue-800' :
                              app.status === ApplicationStatus.COMPLETED ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <select 
                              className="text-xs font-bold bg-white border border-slate-200 rounded-lg px-2 py-1 outline-none"
                              value={app.status}
                              onChange={(e) => handleStatusChange(app.id, e.target.value as ApplicationStatus)}
                            >
                              {Object.values(ApplicationStatus).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </td>
                        </tr>
                      ))}
                      {apps.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-slate-400">No applications to display.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 h-80">
                <h3 className="font-bold text-slate-900 mb-4">Application Distribution</h3>
                <ResponsiveContainer width="100%" height="80%">
                  <BarChart data={statsData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis hide />
                    <Tooltip />
                    <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                      {statsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
                <h3 className="font-bold mb-4">Admin Quick Action</h3>
                <div className="space-y-3">
                  <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-all text-left px-4 flex justify-between items-center">
                    <span>Export Data (Excel)</span>
                    <i className="fas fa-download"></i>
                  </button>
                  <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-all text-left px-4 flex justify-between items-center">
                    <span>Broadcast Notification</span>
                    <i className="fas fa-bullhorn"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="p-6 border-b">
                <h3 className="font-bold text-slate-900">Registered Users</h3>
             </div>
             <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-400 text-xs font-bold tracking-widest uppercase">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Mobile</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Joined On</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-bold text-slate-900">{u.name}</td>
                      <td className="px-6 py-4">{u.mobile}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${u.role === UserRole.ADMIN ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-xs">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
