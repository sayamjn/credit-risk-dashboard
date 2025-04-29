import React, { useState } from 'react';
import { Card, Form, Select, Button, Input, Space, Alert, Divider, Typography } from 'antd';
import { UserOutlined, FileSearchOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { CustomerStatus, CustomerWithRisk } from '@/types';

const { Option } = Select;
const { Title, Text } = Typography;

interface StatusUpdateFormProps {
  customers: CustomerWithRisk[];
  loading: boolean;
  onUpdateStatus: (customerId: string, status: CustomerStatus) => Promise<void>;
}

const StatusUpdateForm: React.FC<StatusUpdateFormProps> = ({ 
  customers, 
  loading, 
  onUpdateStatus 
}) => {
  const [form] = Form.useForm();
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerWithRisk | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleCustomerChange = (customerId: string) => {
    const customer = customers.find(c => c.customerId === customerId) || null;
    setSelectedCustomer(customer);
    if (customer) {
      form.setFieldsValue({
        currentStatus: customer.status,
        newStatus: customer.status,
      });
    }
  };
  
  const handleSubmit = async (values: any) => {
    if (!selectedCustomer) return;
    
    try {
      setSubmitting(true);
      await onUpdateStatus(selectedCustomer.customerId, values.newStatus);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <Card title="Update Customer Status" loading={loading}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="customerId"
          label="Select Customer"
          rules={[{ required: true, message: 'Please select a customer' }]}
        >
          <Select
            placeholder="Select a customer"
            onChange={handleCustomerChange}
            loading={loading}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option?.children?.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {customers.map(customer => (
              <Option key={customer.customerId} value={customer.customerId}>
                {customer.name} ({customer.customerId})
              </Option>
            ))}
          </Select>
        </Form.Item>
        
        {selectedCustomer && (
          <>
            <Divider />
            
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Title level={5}>Customer Information</Title>
              
              <div>
                <Text strong><UserOutlined /> Name:</Text> {selectedCustomer.name}
              </div>
              
              <Space size="large">
                <div>
                  <Text strong><InfoCircleOutlined /> Risk Score:</Text>{' '}
                  <Text
                    type={
                      selectedCustomer.riskAssessment.riskScore >= 70 ? 'success' :
                      selectedCustomer.riskAssessment.riskScore >= 40 ? 'warning' : 'danger'
                    }
                  >
                    {selectedCustomer.riskAssessment.riskScore.toFixed(1)}
                  </Text>
                </div>
                
                <div>
                  <Text strong><InfoCircleOutlined /> Risk Level:</Text>{' '}
                  <Text
                    type={
                      selectedCustomer.riskAssessment.riskLevel === 'Low' ? 'success' :
                      selectedCustomer.riskAssessment.riskLevel === 'Medium' ? 'warning' : 'danger'
                    }
                  >
                    {selectedCustomer.riskAssessment.riskLevel}
                  </Text>
                </div>
              </Space>
              
              <div>
                <Text strong><FileSearchOutlined /> Current Status:</Text>{' '}
                <Form.Item name="currentStatus" noStyle initialValue={selectedCustomer?.status || ''}>
                  <Input disabled />
                </Form.Item>
              </div>
              
              <Form.Item
                name="newStatus"
                label="Update Status To"
                rules={[{ required: true, message: 'Please select a new status' }]}
                initialValue={selectedCustomer?.status || 'Review'}
              >
                <Select placeholder="Select new status">
                  <Option value="Review">Review</Option>
                  <Option value="Approved">Approved</Option>
                  <Option value="Rejected">Rejected</Option>
                </Select>
              </Form.Item>
              
              {selectedCustomer.riskAssessment.riskLevel === 'High' && (
                <Alert
                  message="High Risk Warning"
                  description="This customer has a high risk profile. Approve with caution."
                  type="warning"
                  showIcon
                />
              )}
              
              {showSuccess && (
                <Alert
                  message="Status Updated"
                  description={`Customer status has been successfully updated.`}
                  type="success"
                  showIcon
                />
              )}
              
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={submitting}
                  block
                >
                  Update Status
                </Button>
              </Form.Item>
            </Space>
          </>
        )}
      </Form>
    </Card>
  );
};

export default StatusUpdateForm;