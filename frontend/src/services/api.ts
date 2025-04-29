import axios from 'axios';
import { CustomerWithRisk, CustomerStatus } from '@/types';

const api = axios.create({
  baseURL: process.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

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