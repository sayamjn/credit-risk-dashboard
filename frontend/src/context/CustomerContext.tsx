import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { message } from 'antd';
import { CustomerWithRisk, CustomerStatus, FinancialMetrics } from '@/types';
import { fetchCustomers, updateCustomerStatus, createHighRiskAlert } from '@/services/api';

interface CustomerContextType {
  customers: CustomerWithRisk[];
  loading: boolean;
  error: string | null;
  metrics: FinancialMetrics;
  refreshData: () => Promise<void>;
  updateStatus: (id: string, status: CustomerStatus) => Promise<void>;
  createAlert: (customerId: string, riskScore: number) => Promise<void>;
}

const defaultMetrics: FinancialMetrics = {
  totalCustomers: 0,
  avgRiskScore: 0,
  totalOutstandingLoans: 0,
  avgCreditScore: 0,
  highRiskCount: 0,
};

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const useCustomerContext = () => {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error('useCustomerContext must be used within a CustomerProvider');
  }
  return context;
};

export const CustomerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [customers, setCustomers] = useState<CustomerWithRisk[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<FinancialMetrics>(defaultMetrics);

  const calculateMetrics = (customerData: CustomerWithRisk[]): FinancialMetrics => {
    if (!customerData.length) return defaultMetrics;

    const totalCustomers = customerData.length;
    const totalRiskScore = customerData.reduce((sum, c) => sum + c.riskAssessment.riskScore, 0);
    const totalLoans = customerData.reduce((sum, c) => sum + c.outstandingLoans, 0);
    const totalCreditScore = customerData.reduce((sum, c) => sum + c.creditScore, 0);
    const highRiskCount = customerData.filter(c => c.riskAssessment.riskLevel === 'High').length;

    return {
      totalCustomers,
      avgRiskScore: totalRiskScore / totalCustomers,
      totalOutstandingLoans: totalLoans,
      avgCreditScore: totalCreditScore / totalCustomers,
      highRiskCount,
    };
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchCustomers();
      setCustomers(data);
      setMetrics(calculateMetrics(data));
      setError(null);
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError('Failed to load customer data. Please try again.');
      message.error('Failed to load customer data');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: CustomerStatus) => {
    try {
      const updatedCustomer = await updateCustomerStatus(id, status);
      
      setCustomers(prevCustomers => {
        const newCustomers = prevCustomers.map(customer => 
          customer.customerId === id ? updatedCustomer : customer
        );
        setMetrics(calculateMetrics(newCustomers));
        return newCustomers;
      });
      
      message.success(`Customer status updated to ${status}`);
      
      if (status === 'Approved') {
        const customer = customers.find(c => c.customerId === id);
        if (customer && customer.riskAssessment.riskScore < 40) {
          await createAlert(id, customer.riskAssessment.riskScore);
        }
      }
    } catch (err) {
      console.error('Error updating status:', err);
      message.error('Failed to update customer status');
    }
  };

  const createAlert = async (customerId: string, riskScore: number) => {
    try {
      await createHighRiskAlert(customerId, riskScore);
      message.warning(`Alert created for high-risk customer: ${customerId}`);
    } catch (err) {
      console.error('Error creating alert:', err);
      message.error('Failed to create high-risk alert');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const value = {
    customers,
    loading,
    error,
    metrics,
    refreshData: fetchData,
    updateStatus,
    createAlert,
  };

  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
};