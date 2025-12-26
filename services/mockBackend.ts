
import { User, UserRole, Application, ApplicationStatus, Service } from '../types';

const USERS_KEY = 'om_sai_users';
const APPS_KEY = 'om_sai_apps';

export const mockBackend = {
  getUsers: (): User[] => JSON.parse(localStorage.getItem(USERS_KEY) || '[]'),
  
  saveUser: (user: User) => {
    const users = mockBackend.getUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  findUser: (mobile: string) => {
    return mockBackend.getUsers().find(u => u.mobile === mobile);
  },

  getApplications: (): Application[] => JSON.parse(localStorage.getItem(APPS_KEY) || '[]'),

  getUserApplications: (userId: string): Application[] => {
    return mockBackend.getApplications().filter(app => app.userId === userId);
  },

  createApplication: (app: Partial<Application>) => {
    const apps = mockBackend.getApplications();
    const newApp: Application = {
      id: Math.random().toString(36).substr(2, 9),
      userId: app.userId!,
      userName: app.userName!,
      serviceId: app.serviceId!,
      serviceName: app.serviceName!,
      status: ApplicationStatus.PENDING,
      documents: app.documents || [],
      createdAt: new Date().toISOString(),
      amount: app.amount || 0,
      notes: app.notes || ''
    };
    apps.push(newApp);
    localStorage.setItem(APPS_KEY, JSON.stringify(apps));
    return newApp;
  },

  updateApplicationStatus: (id: string, status: ApplicationStatus) => {
    const apps = mockBackend.getApplications();
    const index = apps.findIndex(a => a.id === id);
    if (index !== -1) {
      apps[index].status = status;
      localStorage.setItem(APPS_KEY, JSON.stringify(apps));
    }
  }
};
