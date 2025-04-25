import React, { useMemo, useState } from 'react';
import { Card, Table, Tag, Button, Space, Modal, Alert, Typography } from 'antd';
import { WarningOutlined, BellOutlined } from '@ant-design/icons';
import { CustomerWithRisk } from '@/types';

const { Text, Title } = Typography;

interface AlertSystemProps {
  customers: CustomerWithRisk[];
  loading: boolean;
  onCreateAlert: (customerId: string, riskScore: number) => Promise<void>;
}

const AlertSystem: React.FC<AlertSystemProps> = ({ 
  customers, 
  loading, 
  onCreateAlert 
}) => {
  const [alerting, setAlerting] = useState<{ [key: string]: boolean }>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerWithRisk | null>(null);
  
  const highRiskCustomers = useMemo(() => {
    return customers.filter(customer => 
      customer.riskAssessment.riskScore < 40
    );
  }, [customers]);
  
  const handleCreateAlert = async (customer: CustomerWithRisk) => {
    try {
      setAlerting(prev => ({ ...prev, [customer.customerId]: true }));
      await onCreateAlert(customer.customerId, customer.riskAssessment.riskScore);
    } finally {
      setAlerting(prev => ({ ...prev, [customer.customerId]: false }));
    }
  };
  
  const handleViewDetails = (customer: CustomerWithRisk) => {
    setSelectedCustomer(customer);
    setModalVisible(true);
  };
  
  // Table columns
  const columns = [
    {
      title: 'Customer ID',
      dataIndex: 'customerId',
      key: 'customerId',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Risk Score',
      key: 'riskScore',
      render: (record: CustomerWithRisk) => (
        <Text type="danger">{record.riskAssessment.riskScore.toFixed(1)}</Text>
      ),
      sorter: (a: CustomerWithRisk, b: CustomerWithRisk) => 
        a.riskAssessment.riskScore - b.riskAssessment.riskScore,
    },
    {
      title: 'Status',
      key: 'status',
      render: (record: CustomerWithRisk) => (
        <Tag color={
          record.status === 'Approved' ? 'green' :
          record.status === 'Review' ? 'blue' : 'red'
        }>
          {record.status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: CustomerWithRisk) => (
        <Space>
          <Button
            type="primary"
            danger
            icon={<BellOutlined />}
            loading={alerting[record.customerId]}
            onClick={() => handleCreateAlert(record)}
            disabled={record.status === 'Rejected'}
          >
            Create Alert
          </Button>
          <Button
            type="default"
            onClick={() => handleViewDetails(record)}
          >
            View Details
          </Button>
        </Space>
      ),
    },
  ];
  
  return (
    <>
      <Card 
        title={
          <Space>
            <WarningOutlined style={{ color: '#f5222d' }} />
            <span>High Risk Customers Alert System</span>
          </Space>
        }
        loading={loading}
      >
        {highRiskCustomers.length === 0 ? (
          <Alert
            message="No High Risk Customers"
            description="There are currently no customers that require immediate attention."
            type="success"
            showIcon
          />
        ) : (
          <>
            <Alert
              message={`${highRiskCustomers.length} High Risk Customer${highRiskCustomers.length !== 1 ? 's' : ''} Detected`}
              description="The following customers have been flagged as high risk and may require immediate attention."
              type="warning"
              showIcon
              style={{ marginBottom: 16 }}
            />
            
            <Table
              columns={columns}
              dataSource={highRiskCustomers}
              rowKey="customerId"
              pagination={highRiskCustomers.length > 5 ? { pageSize: 5 } : false}
            />
          </>
        )}
      </Card>
      
      {/* Customer Details Modal */}
      <Modal
        title="Customer Risk Details"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button 
            key="close" 
            onClick={() => setModalVisible(false)}
          >
            Close
          </Button>,
          selectedCustomer && (
            <Button
              key="alert"
              type="primary"
              danger
              icon={<BellOutlined />}
              loading={alerting[selectedCustomer.customerId]}
              onClick={() => {
                if (selectedCustomer) {
                  handleCreateAlert(selectedCustomer);
                  setModalVisible(false);
                }
              }}
              disabled={selectedCustomer.status === 'Rejected'}
            >
              Create Alert
            </Button>
          ),
        ]}
        width={600}
      >
        {selectedCustomer && (
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Title level={5}>Customer Information</Title>
              <p><strong>Name:</strong> {selectedCustomer.name}</p>
              <p><strong>ID:</strong> {selectedCustomer.customerId}</p>
              <p><strong>Status:</strong> {selectedCustomer.status}</p>
            </div>
            
            <div>
              <Title level={5}>Financial Details</Title>
              <p><strong>Monthly Income:</strong> ${selectedCustomer.monthlyIncome.toLocaleString()}</p>
              <p><strong>Monthly Expenses:</strong> ${selectedCustomer.monthlyExpenses.toLocaleString()}</p>
              <p><strong>Outstanding Loans:</strong> ${selectedCustomer.outstandingLoans.toLocaleString()}</p>
              <p><strong>Account Balance:</strong> ${selectedCustomer.accountBalance.toLocaleString()}</p>
            </div>
            
            <div>
              <Title level={5}>Risk Assessment</Title>
              <p>
                <strong>Risk Score:</strong>{' '}
                <Text type="danger">{selectedCustomer.riskAssessment.riskScore.toFixed(1)}</Text>
              </p>
              <p>
                <strong>Risk Level:</strong>{' '}
                <Tag color="red">{selectedCustomer.riskAssessment.riskLevel}</Tag>
              </p>
              <p>
                <strong>Credit Score Component:</strong>{' '}
                {selectedCustomer.riskAssessment.factors.creditScoreComponent.toFixed(1)}
              </p>
              <p>
                <strong>Repayment History Component:</strong>{' '}
                {selectedCustomer.riskAssessment.factors.repaymentComponent.toFixed(1)}
              </p>
              <p>
                <strong>Debt Ratio Component:</strong>{' '}
                {selectedCustomer.riskAssessment.factors.debtRatioComponent.toFixed(1)}
              </p>
            </div>
            
            <Alert
              message="Risk Factors"
              description={
                <ul>
                  {selectedCustomer.creditScore < 650 && (
                    <li>Low credit score: {selectedCustomer.creditScore}</li>
                  )}
                  {selectedCustomer.loanRepaymentHistory.filter(p => p === 0).length > 2 && (
                    <li>Multiple missed payments: {selectedCustomer.loanRepaymentHistory.filter(p => p === 0).length} out of {selectedCustomer.loanRepaymentHistory.length}</li>
                  )}
                  {(selectedCustomer.outstandingLoans / selectedCustomer.monthlyIncome) > 3 && (
                    <li>High debt-to-income ratio: {((selectedCustomer.outstandingLoans / selectedCustomer.monthlyIncome)).toFixed(1)}x monthly income</li>
                  )}
                </ul>
              }
              type="error"
              showIcon
            />
          </Space>
        )}
      </Modal>
    </>
  );
};

export default AlertSystem;