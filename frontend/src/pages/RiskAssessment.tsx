import React, { useState } from 'react';
import { Row, Col, Typography, Space, Select, Empty, Spin } from 'antd';
import { useCustomerContext } from '@/context/CustomerContext';
import RiskScoreCard from '@/components/risk/RiskScoreCard';
import RiskFactorsTable from '@/components/risk/RiskFactorsTable';
import CustomersTable from '@/components/dashboard/CustomersTable';

const { Title } = Typography;
const { Option } = Select;

const RiskAssessment: React.FC = () => {
  const { customers, loading, error, updateStatus } = useCustomerContext();
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  
  const selectedCustomer = selectedCustomerId 
    ? customers.find(c => c.customerId === selectedCustomerId) 
    : null;
  
  const handleCustomerSelect = (customerId: string) => {
    setSelectedCustomerId(customerId);
  };
  
  const handleStatusChange = async (customerId: string, status: any) => {
    await updateStatus(customerId, status);
  };
  
  if (error) {
    return <div>{error}</div>;
  }
  
  return (
    <div className="risk-assessment-container">
      <Title level={2}>Risk Assessment</Title>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <div style={{ marginBottom: 16 }}>
                <Typography.Text strong style={{ marginRight: 8 }}>
                  Select Customer:
                </Typography.Text>
                <Select
                  style={{ width: 300 }}
                  placeholder="Select a customer"
                  onChange={handleCustomerSelect}
                  value={selectedCustomerId}
                  showSearch
                  optionFilterProp="children"
                >
                  {customers.map(customer => (
                    <Option key={customer.customerId} value={customer.customerId}>
                      {customer.name} ({customer.customerId})
                    </Option>
                  ))}
                </Select>
              </div>
            </Col>
          </Row>
          
          {selectedCustomer ? (
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <RiskScoreCard customer={selectedCustomer} />
              </Col>
              <Col xs={24} md={16}>
                <RiskFactorsTable customer={selectedCustomer} />
              </Col>
            </Row>
          ) : (
            <Empty 
              description="Select a customer to view detailed risk assessment" 
              style={{ margin: '40px 0' }}
            />
          )}
          
          <CustomersTable 
            customers={customers} 
            loading={loading} 
            onStatusChange={handleStatusChange}
          />
        </Space>
      )}
    </div>
  );
};

export default RiskAssessment;