import React from 'react';
import { Layout, Typography, Space, Switch, Avatar } from 'antd';
import { BankOutlined, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

interface AppHeaderProps {
  darkMode: boolean;
  onDarkModeToggle: (checked: boolean) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ darkMode, onDarkModeToggle }) => {
  return (
    <Header style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '0 24px',
      background: darkMode ? '#1f1f1f' : '#fff',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      height: 64,
    }}>
      <Space>
        <BankOutlined 
          style={{ 
            fontSize: 24, 
            color: darkMode ? '#fff' : '#1890ff' 
          }} 
        />
        <Title 
          level={3} 
          style={{ 
            margin: 0,
            color: darkMode ? '#fff' : undefined
          }}
        >
          Credit Risk Dashboard
        </Title>
      </Space>
      
      <Space>
        <Switch
          checked={darkMode}
          onChange={onDarkModeToggle}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
        />
        
        <Avatar 
          style={{ 
            backgroundColor: darkMode ? '#1890ff' : '#87d068',
            marginLeft: 16
          }} 
          icon={<UserOutlined />} 
        />
      </Space>
    </Header>
  );
};

export default AppHeader;