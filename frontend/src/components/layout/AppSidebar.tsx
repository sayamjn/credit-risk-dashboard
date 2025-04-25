import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { 
  DashboardOutlined, 
  SafetyOutlined, 
  ProjectOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const { Sider } = Layout;

interface AppSidebarProps {
  darkMode: boolean;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ darkMode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  
  const navItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/risk-assessment',
      icon: <SafetyOutlined />,
      label: 'Risk Assessment',
    },
    {
      key: '/workflow',
      icon: <ProjectOutlined />,
      label: 'Workflow',
    },
  ];
  
  return (
    <Sider
      width={220}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      theme={darkMode ? 'dark' : 'light'}
      style={{
        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
        zIndex: 10,
        height: '100%',
      }}
      trigger={null}
    >
      <div 
        style={{ 
          textAlign: 'center', 
          padding: '16px 0',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleCollapsed}
          style={{
            color: darkMode ? '#fff' : undefined,
          }}
        />
      </div>
      
      <Menu
        theme={darkMode ? 'dark' : 'light'}
        mode="inline"
        selectedKeys={[location.pathname]}
        items={navItems}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
};

export default AppSidebar;