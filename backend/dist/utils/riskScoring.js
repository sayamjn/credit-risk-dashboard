"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRiskScore = calculateRiskScore;
/**
 * Calculate risk score for a customer based on:
 * 1. Credit score (normalized from 300-850 to 0-100) - 50% weight
 * 2. Loan repayment history (percentage of on-time payments) - 30% weight
 * 3. Debt-to-income ratio (outstanding loans / monthly income) - 20% weight
 */
function calculateRiskScore(customer) {
    // Credit score component (normalized from 300-850 to 0-100)
    const creditScoreComponent = Math.max(0, Math.min(100, (customer.creditScore - 300) / 5.5));
    // Repayment history component (percentage of on-time payments)
    const totalPayments = customer.loanRepaymentHistory.length;
    const successfulPayments = customer.loanRepaymentHistory.reduce((sum, val) => sum + val, 0);
    const repaymentComponent = totalPayments > 0
        ? (successfulPayments / totalPayments) * 100
        : 50; // Default to neutral if no history
    // Debt-to-income ratio component (lower is better)
    const debtRatio = customer.outstandingLoans / customer.monthlyIncome;
    const debtRatioComponent = 100 - Math.min(100, debtRatio * 8);
    // Calculate weighted risk score
    const riskScore = (creditScoreComponent * 0.5 +
        repaymentComponent * 0.3 +
        debtRatioComponent * 0.2);
    // Determine risk level
    let riskLevel;
    if (riskScore >= 70) {
        riskLevel = 'Low';
    }
    else if (riskScore >= 40) {
        riskLevel = 'Medium';
    }
    else {
        riskLevel = 'High';
    }
    return {
        riskScore,
        riskLevel,
        factors: {
            creditScoreComponent,
            repaymentComponent,
            debtRatioComponent
        }
    };
}
