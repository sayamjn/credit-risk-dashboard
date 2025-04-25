import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, ConfigProvider, theme } from 'antd';
import { CustomerProvider } from './context/CustomerContext';

// Pages
import Dashboard from './pages/Dashboard';
import RiskAssessment from './pages/RiskAssessment';
import Workflow from './pages/Workflow';

// Layout Components
import AppHeader from './components/layout/AppHeader';
import AppSidebar from './components/layout/AppSidebar';

// Styles
import './App.css';

const { Content } = Layout;

const App: React.FC = () => {
  // State for dark mode toggle
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  
  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);
  
  // Handle dark mode toggle
  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
  };
  
  // Configure theme
  const { defaultAlgorithm, darkAlgorithm } = theme;
  
  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <CustomerProvider>
        <Router>
          <Layout style={{ minHeight: '100vh' }}>
            <AppHeader darkMode={darkMode} onDarkModeToggle={handleDarkModeToggle} />
            <Layout>
              <AppSidebar darkMode={darkMode} />
              <Layout>
                <Content style={{ 
                  margin: '24px 16px', 
                  padding: 24, 
                  background: darkMode ? '#141414' : '#fff',
                  borderRadius: 4, 
                  minHeight: 280,
                }}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/risk-assessment" element={<RiskAssessment />} />
                    <Route path="/workflow" element={<Workflow />} />
                  </Routes>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </Router>
      </CustomerProvider>
    </ConfigProvider>
  );
};

export default App;