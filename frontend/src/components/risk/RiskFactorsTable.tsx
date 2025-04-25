import React from 'react';
import { Card, Table, Tag, Typography } from 'antd';
import { CustomerWithRisk } from '@/types';

const { Text } = Typography;

interface RiskFactorsTableProps {
  customer: CustomerWithRisk;
}

const RiskFactorsTable: React.FC<RiskFactorsTableProps> = ({ customer }) => {
  const repaymentPercentage = () => {
    const totalPayments = customer.loanRepaymentHistory.length;
    if (totalPayments === 0) return 0;
    
    const successfulPayments = customer.loanRepaymentHistory.reduce((sum, val) => sum + val, 0);
    return (successfulPayments / totalPayments) * 100;
  };
  
  const debtToIncomeRatio = customer.outstandingLoans / (customer.monthlyIncome * 12);
  
  const getCreditScoreRating = (score: number) => {
    if (score >= 750) return { text: 'Excellent', color: 'success' };
    if (score >= 700) return { text: 'Good', color: 'success' };
    if (score >= 650) return { text: 'Fair', color: 'warning' };
    if (score >= 600) return { text: 'Poor', color: 'warning' };
    return { text: 'Very Poor', color: 'error' };
  };
  
  const getRepaymentRating = (percentage: number) => {
    if (percentage >= 90) return { text: 'Excellent', color: 'success' };
    if (percentage >= 75) return { text: 'Good', color: 'success' };
    if (percentage >= 60) return { text: 'Fair', color: 'warning' };
    if (percentage >= 40) return { text: 'Poor', color: 'warning' };
    return { text: 'Very Poor', color: 'error' };
  };
  
  const getDebtRatioRating = (ratio: number) => {
    if (ratio <= 0.1) return { text: 'Excellent', color: 'success' };
    if (ratio <= 0.3) return { text: 'Good', color: 'success' };
    if (ratio <= 0.4) return { text: 'Fair', color: 'warning' };
    if (ratio <= 0.5) return { text: 'Poor', color: 'warning' };
    return { text: 'Very Poor', color: 'error' };
  };
  
  const creditRating = getCreditScoreRating(customer.creditScore);
  const repaymentRating = getRepaymentRating(repaymentPercentage());
  const debtRatioRating = getDebtRatioRating(debtToIncomeRatio);
  
  const data = [
    {
      key: '1',
      factor: 'Credit Score',
      value: customer.creditScore,
      rating: <Tag color={creditRating.color}>{creditRating.text}</Tag>,
      impact: <Text type="secondary">50% of risk score</Text>,
      details: (
        <Text type="secondary">
          Higher credit scores indicate better creditworthiness. Scores range from 300-850.
        </Text>
      ),
    },
    {
      key: '2',
      factor: 'Loan Repayment History',
      value: `${repaymentPercentage().toFixed(0)}% on-time`,
      rating: <Tag color={repaymentRating.color}>{repaymentRating.text}</Tag>,
      impact: <Text type="secondary">30% of risk score</Text>,
      details: (
        <Text type="secondary">
          Percentage of on-time loan payments. Recent history (last 8 payments): 
          {customer.loanRepaymentHistory.map((payment, index) => (
            <Tag 
              key={index} 
              color={payment ? 'green' : 'red'} 
              style={{ margin: '0 2px' }}
            >
              {payment ? 'Paid' : 'Missed'}
            </Tag>
          ))}
        </Text>
      ),
    },
    {
      key: '3',
      factor: 'Debt-to-Income Ratio',
      value: `${(debtToIncomeRatio * 100).toFixed(0)}%`,
      rating: <Tag color={debtRatioRating.color}>{debtRatioRating.text}</Tag>,
      impact: <Text type="secondary">20% of risk score</Text>,
      details: (
        <Text type="secondary">
          Outstanding loans ($
          {customer.outstandingLoans.toLocaleString()}) as a percentage of annual income ($
          {(customer.monthlyIncome * 12).toLocaleString()}). Lower is better.
        </Text>
      ),
    },
  ];
  
  const columns = [
    {
      title: 'Risk Factor',
      dataIndex: 'factor',
      key: 'factor',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Impact',
      dataIndex: 'impact',
      key: 'impact',
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
    },
  ];
  
  return (
    <Card title="Risk Factor Analysis">
      <Table 
        columns={columns} 
        dataSource={data} 
        pagination={false}
      />
    </Card>
  );
};

export default RiskFactorsTable;