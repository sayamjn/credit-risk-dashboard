import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { DollarOutlined, UserOutlined, BankOutlined, SafetyOutlined, WarningOutlined } from '@ant-design/icons';
import { FinancialMetrics } from '@/types';

interface MetricsCardsProps {
  metrics: FinancialMetrics;
  loading: boolean;
}

const MetricsCards: React.FC<MetricsCardsProps> = ({ metrics, loading }) => {
  return (
    <Row gutter={[16, 16]} className="metrics-row">
      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
        <Card>
          <Statistic
            title="Total Customers"
            value={metrics.totalCustomers}
            loading={loading}
            prefix={<UserOutlined />}
            valueStyle={{ color: '#3f8600' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
        <Card>
          <Statistic
            title="Average Risk Score"
            value={metrics.avgRiskScore}
            loading={loading}
            prefix={<SafetyOutlined />}
            valueStyle={{ color: metrics.avgRiskScore > 70 ? '#3f8600' : 
                          metrics.avgRiskScore > 40 ? '#faad14' : '#cf1322' }}
            precision={1}
            suffix="/100"
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
        <Card>
          <Statistic
            title="Total Outstanding Loans"
            value={metrics.totalOutstandingLoans}
            loading={loading}
            prefix={<DollarOutlined />}
            precision={0}
            valueStyle={{ color: '#1890ff' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
        <Card>
          <Statistic
            title="Average Credit Score"
            value={metrics.avgCreditScore}
            loading={loading}
            prefix={<BankOutlined />}
            precision={0}
            valueStyle={{ color: metrics.avgCreditScore > 700 ? '#3f8600' : 
                          metrics.avgCreditScore > 650 ? '#faad14' : '#cf1322' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
        <Card>
          <Statistic
            title="High Risk Customers"
            value={metrics.highRiskCount}
            loading={loading}
            prefix={<WarningOutlined />}
            valueStyle={{ color: metrics.highRiskCount > 0 ? '#cf1322' : '#3f8600' }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default MetricsCards;