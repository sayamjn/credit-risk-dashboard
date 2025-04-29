import React, { useState } from 'react';
import { Table, Card, Tag, Progress, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { CustomerWithRisk, RiskLevel, CustomerStatus } from '@/types';

interface CustomersTableProps {
  customers: CustomerWithRisk[];
  loading: boolean;
  onStatusChange?: (customerId: string, status: CustomerStatus) => void;
}

const getRiskColor = (riskLevel: RiskLevel) => {
  switch (riskLevel) {
    case 'Low':
      return 'success';
    case 'Medium':
      return 'warning';
    case 'High':
      return 'error';
    default:
      return '';
  }
};

const getStatusColor = (status: CustomerStatus) => {
  switch (status) {
    case 'Approved':
      return 'success';
    case 'Review':
      return 'processing';
    case 'Rejected':
      return 'error';
    default:
      return '';
  }
};

const CustomersTable: React.FC<CustomersTableProps> = ({ 
  customers, 
  loading,
  onStatusChange 
}) => {
  const [searchText, setSearchText] = useState('');
  const [riskFilter, setRiskFilter] = useState<RiskLevel | 'All'>('All');

  const getFilteredData = () => {
    return customers.filter(customer => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
        customer.customerId.toLowerCase().includes(searchText.toLowerCase());
        
      const matchesRiskFilter = 
        riskFilter === 'All' || customer.riskAssessment.riskLevel === riskFilter;
        
      return matchesSearch && matchesRiskFilter;
    });
  };

  const handleStatusChange = (value: CustomerStatus, customerId: string) => {
    if (onStatusChange) {
      onStatusChange(customerId, value);
    }
  };

  const columns = [
    {
      title: 'Customer ID',
      dataIndex: 'customerId',
      key: 'customerId',
      sorter: (a: CustomerWithRisk, b: CustomerWithRisk) => a.customerId.localeCompare(b.customerId),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: CustomerWithRisk, b: CustomerWithRisk) => a.name.localeCompare(b.name),
    },
    {
      title: 'Monthly Income',
      dataIndex: 'monthlyIncome',
      key: 'monthlyIncome',
      render: (income: number) => `$${income.toLocaleString()}`,
      sorter: (a: CustomerWithRisk, b: CustomerWithRisk) => a.monthlyIncome - b.monthlyIncome,
    },
    {
      title: 'Credit Score',
      dataIndex: 'creditScore',
      key: 'creditScore',
      sorter: (a: CustomerWithRisk, b: CustomerWithRisk) => a.creditScore - b.creditScore,
    },
    {
      title: 'Risk Score',
      key: 'riskScore',
      render: (record: CustomerWithRisk) => (
        <Progress 
          percent={Math.round(record.riskAssessment.riskScore)} 
          size="small"
          status={record.riskAssessment.riskScore < 40 ? 'exception' : 'active'}
          strokeColor={
            record.riskAssessment.riskScore >= 70 ? '#52c41a' :
            record.riskAssessment.riskScore >= 40 ? '#faad14' : '#f5222d'
          }
        />
      ),
      sorter: (a: CustomerWithRisk, b: CustomerWithRisk) => 
        a.riskAssessment.riskScore - b.riskAssessment.riskScore,
    },
    {
      title: 'Risk Level',
      key: 'riskLevel',
      render: (record: CustomerWithRisk) => (
        <Tag color={getRiskColor(record.riskAssessment.riskLevel)}>
          {record.riskAssessment.riskLevel}
        </Tag>
      ),
      filters: [
        { text: 'Low', value: 'Low' },
        { text: 'Medium', value: 'Medium' },
        { text: 'High', value: 'High' },
      ],
      onFilter: (value: string, record: CustomerWithRisk) => 
        record.riskAssessment.riskLevel === value,
    },
    {
      title: 'Status',
      key: 'status',
      render: (record: CustomerWithRisk) => (
        onStatusChange ? (
          <Select
            value={record.status}
            onChange={(value) => handleStatusChange(value as CustomerStatus, record.customerId)}
            style={{ width: 120 }}
            options={[
              { value: 'Review', label: 'Review' },
              { value: 'Approved', label: 'Approved' },
              { value: 'Rejected', label: 'Rejected' },
            ]}
          />
        ) : (
          <Tag color={getStatusColor(record.status)}>
            {record.status}
          </Tag>
        )
      ),
      filters: [
        { text: 'Review', value: 'Review' },
        { text: 'Approved', value: 'Approved' },
        { text: 'Rejected', value: 'Rejected' },
      ],
      onFilter: (value: any, record: CustomerWithRisk) => record.status === value,
    },
  ];

  return (
    <Card title="Customer Data">
      <div style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
        <Input
          placeholder="Search by name or ID"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 250 }}
        />
        <Select
          style={{ width: 150 }}
          placeholder="Filter by risk"
          value={riskFilter}
          onChange={value => setRiskFilter(value)}
          options={[
            { value: 'All', label: 'All Risks' },
            { value: 'Low', label: 'Low Risk' },
            { value: 'Medium', label: 'Medium Risk' },
            { value: 'High', label: 'High Risk' },
          ]}
        />
      </div>
      <Table
        columns={columns}
        dataSource={getFilteredData()}
        rowKey="customerId"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
};

export default CustomersTable;