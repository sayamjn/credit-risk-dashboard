import axios from 'axios';
import { CustomerWithRisk, CustomerStatus } from '@/types';

const API_URL = 'https://credit-risk-dashboard-api.onrender.com';

export const fetchCustomers = async (): Promise<CustomerWithRisk[]> => {
  console.log('Fetching customers from:', `${API_URL}/api/customers`);
  try {
    const response = await axios.get(`${API_URL}/api/customers`);
    console.log('Customer data response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};



export const fetchCustomerById = async (id: string): Promise<CustomerWithRisk> => {
  try {
    const response = await axios.get(`${API_URL}/api/customers/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching customer ${id}:`, error);
    throw error;
  }
};

export const updateCustomerStatus = async (
  id: string, 
  status: CustomerStatus
): Promise<CustomerWithRisk> => {
  try {
    const response = await axios.put(`${API_URL}/api/customers/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating customer ${id} status:`, error);
    throw error;
  }
};

export const createHighRiskAlert = async (
  customerId: string, 
  riskScore: number
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios.post(`${API_URL}/api/alerts`, { customerId, riskScore });
    return response.data;
  } catch (error) {
    console.error(`Error creating alert for customer ${customerId}:`, error);
    throw error;
  }
};

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;