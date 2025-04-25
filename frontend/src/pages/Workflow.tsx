import React from 'react';
import { Row, Col, Typography, Spin, Space } from 'antd';
import { useCustomerContext } from '@/context/CustomerContext';
import StatusUpdateForm from '@/components/workflow/StatusUpdateForm';
import AlertSystem from '@/components/workflow/AlertSystem';

const { Title } = Typography;

const Workflow: React.FC = () => {
  const { customers, loading, error, updateStatus, createAlert } = useCustomerContext();
  
  if (error) {
    return <div>{error}</div>;
  }
  
  return (
    <div className="workflow-container">
      <Title level={2}>Workflow Automation</Title>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <StatusUpdateForm 
                customers={customers} 
                loading={loading} 
                onUpdateStatus={updateStatus} 
              />
            </Col>
            <Col xs={24} lg={12}>
              <AlertSystem 
                customers={customers} 
                loading={loading} 
                onCreateAlert={createAlert} 
              />
            </Col>
          </Row>
        </Space>
      )}
    </div>
  );
};

export default Workflow;