import React from 'react';
import { Card, Progress, Typography, Space, Divider, Badge } from 'antd';
import { CustomerWithRisk } from '@/types';

const { Title, Text } = Typography;

interface RiskScoreCardProps {
  customer: CustomerWithRisk;
}

const RiskScoreCard: React.FC<RiskScoreCardProps> = ({ customer }) => {
  const { riskAssessment } = customer;
  const { riskScore, riskLevel } = riskAssessment;
  
  const getRiskColor = () => {
    if (riskScore >= 70) return '#52c41a'; // Green - Low risk
    if (riskScore >= 40) return '#faad14'; // Yellow - Medium risk
    return '#f5222d'; // Red - High risk
  };
  
  const getStatusColor = () => {
    switch (customer.status) {
      case 'Approved': return 'success';
      case 'Review': return 'processing';
      case 'Rejected': return 'error';
      default: return 'default';
    }
  };

  return (
    <Card>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={4}>Risk Assessment</Title>
          <Badge
            status={getStatusColor()}
            text={customer.status}
            style={{ 
              fontSize: '16px', 
              fontWeight: 'bold',
              color: getStatusColor() === 'processing' ? '#1890ff' : 
                     getStatusColor() === 'success' ? '#52c41a' : '#f5222d'
            }}
          />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <Progress
            type="dashboard"
            percent={Math.round(riskScore)}
            strokeColor={getRiskColor()}
            format={percent => (
              <span style={{ color: getRiskColor(), fontSize: '24px', fontWeight: 'bold' }}>
                {percent}
              </span>
            )}
          />
          <Title level={3} style={{ marginTop: 0, color: getRiskColor() }}>
            {riskLevel} Risk
          </Title>
        </div>
        
        <Divider />
        
        <div>
          <Title level={5}>Risk Factors</Title>
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>Credit Score: </Text>
              <Text>{customer.creditScore}</Text>
              <Progress 
                percent={Math.round(riskAssessment.factors.creditScoreComponent)} 
                strokeColor={getRiskColor()}
                showInfo={false}
              />
            </div>
            <div>
              <Text strong>Loan Repayment History: </Text>
              <Progress 
                percent={Math.round(riskAssessment.factors.repaymentComponent)} 
                strokeColor={getRiskColor()}
                showInfo={false}
              />
            </div>
            <div>
              <Text strong>Debt-to-Income Ratio: </Text>
              <Progress 
                percent={Math.round(riskAssessment.factors.debtRatioComponent)} 
                strokeColor={getRiskColor()}
                showInfo={false}
              />
            </div>
          </Space>
        </div>
      </Space>
    </Card>
  );
};

export default RiskScoreCard;