import React, { useMemo } from 'react';
import { Card } from 'antd';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CustomerWithRisk, RiskDistributionItem } from '@/types';

interface RiskDistributionChartProps {
  customers: CustomerWithRisk[];
  loading: boolean;
}

// Colors for risk levels
const COLORS = {
  High: '#f5222d',  // Red for high risk
  Medium: '#faad14', // Yellow for medium risk
  Low: '#52c41a',   // Green for low risk
};

const RiskDistributionChart: React.FC<RiskDistributionChartProps> = ({ customers, loading }) => {
  // Calculate risk distribution data
  const distributionData = useMemo((): RiskDistributionItem[] => {
    if (!customers.length) return [];

    const counts = {
      High: 0,
      Medium: 0,
      Low: 0,
    };

    customers.forEach(customer => {
      counts[customer.riskAssessment.riskLevel]++;
    });

    return Object.entries(counts).map(([riskLevel, count]) => ({
      riskLevel: riskLevel as 'High' | 'Medium' | 'Low',
      count,
    }));
  }, [customers]);

  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '10px', 
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}>
          <p><strong>{data.riskLevel} Risk</strong></p>
          <p>{`Count: ${data.count}`}</p>
          <p>{`Percentage: ${((data.count / customers.length) * 100).toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLegend = ({ payload }: any) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} style={{ marginRight: '20px', display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: entry.color,
                marginRight: '5px',
                borderRadius: '2px',
              }}
            />
            <span>{entry.value} Risk</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card title="Risk Distribution" loading={loading}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={distributionData}
            cx="50%"
            cy="50%"
            labelLine={false}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="count"
            nameKey="riskLevel"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {distributionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.riskLevel]} />
            ))}
          </Pie>
          <Tooltip content={customTooltip} />
          <Legend content={renderCustomLegend} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default RiskDistributionChart;