import axios from 'axios';
import { CustomerWithRisk, CustomerStatus } from '@/types';


const baseURL = import.meta.env.VITE_API_URL || '/api';
console.log('Using API URL:', baseURL);

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions
export const fetchCustomers = async (): Promise<CustomerWithRisk[]> => {
  const response = await api.get('/customers');
  return response.data;
};

export const fetchCustomerById = async (id: string): Promise<CustomerWithRisk> => {
  const response = await api.get(`/customers/${id}`);
  return response.data;
};

export const updateCustomerStatus = async (
  id: string, 
  status: CustomerStatus
): Promise<CustomerWithRisk> => {
  const response = await api.put(`/customers/${id}/status`, { status });
  return response.data;
};

export const createHighRiskAlert = async (
  customerId: string, 
  riskScore: number
): Promise<{ success: boolean; message: string }> => {
  const response = await api.post('/alerts', { customerId, riskScore });
  return response.data;
};

export default api;