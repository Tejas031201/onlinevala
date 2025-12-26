
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export enum ApplicationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED'
}

export interface User {
  id: string;
  name: string;
  mobile: string;
  role: UserRole;
  password?: string;
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Government' | 'Banking' | 'Printing' | 'Digital';
  icon: string;
}

export interface Application {
  id: string;
  userId: string;
  userName: string;
  serviceId: string;
  serviceName: string;
  status: ApplicationStatus;
  documents: string[];
  createdAt: string;
  amount: number;
  notes?: string;
  // New fields requested
  clientEmail?: string;
  clientAadhar?: string;
  clientPan?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}
