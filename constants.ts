
import { Service } from './types';

export const BUSINESS_INFO = {
  name: 'Online Vala',
  founder: 'Prashant Sanjay Wagh',
  phone: '9021276704',
  location: 'Bank of Baroda, Taluka Yevla, District Nashik, Maharashtra, India',
  whatsapp: '919021276704',
  email: 'onlinevala.yevla@gmail.com'
};

export const SERVICES_LIST: Service[] = [
  {
    id: 's1',
    name: 'PAN Card (with PVC)',
    description: 'Apply for fresh PAN card with premium durable PVC card delivery.',
    price: 250,
    category: 'Government',
    icon: 'fa-id-card'
  },
  {
    id: 's10',
    name: 'PAN Card (without PVC)',
    description: 'Standard PAN card application with digital and paper delivery.',
    price: 199,
    category: 'Government',
    icon: 'fa-id-card'
  },
  {
    id: 's5',
    name: 'Voting Card Services',
    description: 'New voter registration, correction, and digital Voter ID assistance.',
    price: 250,
    category: 'Government',
    icon: 'fa-box-archive'
  },
  {
    id: 's11',
    name: 'ABHA Card',
    description: 'Create your Digital Health Account (ABHA) for health records.',
    price: 99,
    category: 'Government',
    icon: 'fa-heart-pulse'
  },
  {
    id: 's12',
    name: 'RC Book Services',
    description: 'Assistance with vehicle Registration Certificate (RC) related tasks.',
    price: 299,
    category: 'Government',
    icon: 'fa-car'
  },
  {
    id: 's13',
    name: 'Plastic Card Printing',
    description: 'High-quality printing of any document on durable plastic/PVC cards.',
    price: 99,
    category: 'Printing',
    icon: 'fa-credit-card'
  },
  {
    id: 's2',
    name: 'Aadhaar Update',
    description: 'Biometric or demographic updates and Aadhaar card printing services.',
    price: 100,
    category: 'Government',
    icon: 'fa-fingerprint'
  },
  {
    id: 's3',
    name: 'Online Form Filling',
    description: 'Expert help for government jobs, scholarships, and exam form submissions.',
    price: 80,
    category: 'Digital',
    icon: 'fa-file-lines'
  },
  {
    id: 's7',
    name: 'Passport Application',
    description: 'Assistance with fresh passport applications and re-issue documentation.',
    price: 500,
    category: 'Government',
    icon: 'fa-passport'
  }
];
