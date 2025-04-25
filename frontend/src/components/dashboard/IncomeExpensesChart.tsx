import React, { useMemo } from 'react';
import { Card } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomerWithRisk, IncomeExpenseDataPoint } from '@/types';

interface IncomeExpensesChartProps {
  customers: CustomerWithRisk[];
  loading: boolean;
}

const IncomeExpensesChart: React.FC<IncomeExpensesChartProps> = ({ customers, loading }) => {
  const chartData = useMemo((): IncomeExpenseDataPoint[] => {
    if (!customers.length) return [];

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    
    return months.map((month, index) => {
      const avgIncome = customers.reduce((sum, customer) => sum + customer.monthlyIncome, 0) / customers.length;
      const avgExpenses = customers.reduce((sum, customer) => sum + customer.monthlyExpenses, 0) / customers.length;
      
      const variance = 0.05; // 5% variance
      const randomFactor = 1 + (Math.random() * variance * 2 - variance);
      const trendFactor = 1 + (index * 0.01); // Small upward trend over time
      
      return {
        month,
        income: Math.round(avgIncome * randomFactor * trendFactor),
        expenses: Math.round(avgExpenses * randomFactor * trendFactor),
      };
    });
  }, [customers]);

  return (
    <Card title="Income vs Expenses Trend" loading={loading}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value}`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#52c41a"
            activeDot={{ r: 8 }}
            name="Income"
          />
          <Line 
            type="monotone" 
            dataKey="expenses" 
            stroke="#f5222d" 
            name="Expenses" 
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IncomeExpensesChart;