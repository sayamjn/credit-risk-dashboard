import { RiskLevel, CustomerWithRisk } from '@/types';

/**
 * Get color for risk level.
 * @param riskLevel - The risk level to get color for
 * @returns The corresponding color code
 * 
 * AI-assisted development: GitHub Copilot suggested the color scheme based on Ant Design conventions
 */
export const getRiskColor = (riskLevel: RiskLevel): string => {
  switch (riskLevel) {
    case 'Low':
      return '#52c41a'; // green
    case 'Medium':
      return '#faad14'; // yellow
    case 'High':
      return '#f5222d'; // red
    default:
      return '#1890ff'; // blue (default)
  }
};

/**
 * Get color for risk score (numeric value).
 * @param score - The risk score (0-100)
 * @returns The corresponding color code
 */
export const getRiskScoreColor = (score: number): string => {
  if (score >= 70) return '#52c41a'; // green (low risk)
  if (score >= 40) return '#faad14'; // yellow (medium risk)
  return '#f5222d'; // red (high risk)
};

/**
 * Format currency for display.
 * @param value - The numeric value to format
 * @param currency - Currency symbol (default: '$')
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, currency = '$'): string => {
  return `${currency}${value.toLocaleString()}`;
};

/**
 * Calculate debt-to-income ratio.
 * @param outstandingLoans - Total outstanding loans
 * @param monthlyIncome - Monthly income
 * @returns The debt-to-income ratio
 * 
 * AI-assisted development: ChatGPT suggested this calculation approach
 */
export const calculateDebtToIncomeRatio = (
  outstandingLoans: number,
  monthlyIncome: number
): number => {
  const annualIncome = monthlyIncome * 12;
  return annualIncome > 0 ? outstandingLoans / annualIncome : 0;
};

/**
 * Calculate repayment success rate.
 * @param repaymentHistory - Array of payment history (1 = paid, 0 = missed)
 * @returns The percentage of successful payments
 */
export const calculateRepaymentRate = (repaymentHistory: number[]): number => {
  if (repaymentHistory.length === 0) return 0;
  
  const successfulPayments = repaymentHistory.reduce((sum, payment) => sum + payment, 0);
  return (successfulPayments / repaymentHistory.length) * 100;
};

/**
 * Get risk distribution data from customer list.
 * @param customers - List of customers with risk assessments
 * @returns An object with counts for each risk level
 */
export const getRiskDistribution = (customers: CustomerWithRisk[]) => {
  return customers.reduce((distribution, customer) => {
    const level = customer.riskAssessment.riskLevel;
    distribution[level] = (distribution[level] || 0) + 1;
    return distribution;
  }, {} as Record<RiskLevel, number>);
};

/**
 * Sort customers by risk level (high risk first).
 * @param customers - List of customers to sort
 * @returns Sorted list with high risk customers first
 * 
 * AI-assisted development: GitHub Copilot suggested the sorting algorithm
 */
export const sortByRiskLevel = (customers: CustomerWithRisk[]): CustomerWithRisk[] => {
  const riskPriority: Record<RiskLevel, number> = {
    'High': 1,
    'Medium': 2,
    'Low': 3
  };
  
  return [...customers].sort((a, b) => 
    riskPriority[a.riskAssessment.riskLevel] - riskPriority[b.riskAssessment.riskLevel]
  );
};