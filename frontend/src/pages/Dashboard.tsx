import React from 'react';
import { Row, Col, Typography, Spin, Space } from 'antd';
import { useCustomerContext } from '@/context/CustomerContext';
import MetricsCards from '@/components/dashboard/MetricsCards';
import IncomeExpensesChart from '@/components/dashboard/IncomeExpensesChart';
import RiskDistributionChart from '@/components/dashboard/RiskDistributionChart';
import CustomersTable from '@/components/dashboard/CustomersTable';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const { customers, loading, metrics, error } = useCustomerContext();
  
  if (error) {
    return <div>{error}</div>;
  }
  
  return (
    <div className="dashboard-container">
      <Title level={2}>Dashboard Overview</Title>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Key Metrics */}
          <MetricsCards metrics={metrics} loading={loading} />
          
          {/* Charts */}
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <IncomeExpensesChart customers={customers} loading={loading} />
            </Col>
            <Col xs={24} md={12}>
              <RiskDistributionChart customers={customers} loading={loading} />
            </Col>
          </Row>
          
          {/* Customers Table */}
          <CustomersTable customers={customers} loading={loading} />
        </Space>
      )}
    </div>
  );
};

export default Dashboard;