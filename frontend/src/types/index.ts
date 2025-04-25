export type CustomerStatus = 'Review' | 'Approved' | 'Rejected';
export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface Customer {
  customerId: string;
  name: string;
  monthlyIncome: number;
  monthlyExpenses: number;
  creditScore: number;
  outstandingLoans: number;
  loanRepaymentHistory: number[];
  accountBalance: number;
  status: CustomerStatus;
}

export interface RiskFactors {
  creditScoreComponent: number;
  repaymentComponent: number;
  debtRatioComponent: number;
}

export interface RiskAssessment {
  riskScore: number;
  riskLevel: RiskLevel;
  factors: RiskFactors;
}

export interface CustomerWithRisk extends Customer {
  riskAssessment: RiskAssessment;
}

export interface IncomeExpenseDataPoint {
  month: string;
  income: number;
  expenses: number;
}

export interface RiskDistributionItem {
  riskLevel: RiskLevel;
  count: number;
}

export interface FinancialMetrics {
  totalCustomers: number;
  avgRiskScore: number;
  totalOutstandingLoans: number;
  avgCreditScore: number;
  highRiskCount: number;
}