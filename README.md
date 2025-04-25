# Credit Risk Analytics Dashboard

A comprehensive credit risk analytics dashboard for a fintech SaaS platform. This application provides visual insights into customer financial health, risk scores, and workflow management for risk officers.

## Features

### 1. Dashboard Overview
- Financial metrics display using Ant Design components
- Income vs expenses line chart
- Risk score distribution pie chart
- Sortable/filterable customer data table

### 2. Risk Assessment & Scoring
- Advanced risk scoring algorithm based on:
  - Credit score (normalized from 300-850 range)
  - Loan repayment history (binary array: 1 = paid, 0 = missed)
  - Outstanding loans vs income ratio
- Visual risk representation with progress bars, tags, and color coding

### 3. Workflow Automation & Orchestration
- Customer status management (Review, Approved, Rejected)
- Status updates persisted via backend API
- Alert system for high-risk customers

## Technology Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development and optimized builds
- Ant Design component library
- Recharts for data visualization
- React Router for navigation
- Axios for API communication

### Backend
- Node.js with Express
- TypeScript for type safety
- In-memory JSON data storage
- RESTful API endpoints

## Setup Instructions

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open your browser and navigate to `http://localhost:3000` to view the application.

## Risk Scoring Explanation

The risk scoring algorithm calculates a score from 0-100 based on three main factors:

1. **Credit Score Component (50% weight)**
   - Normalizes standard credit scores (300-850) to a 0-100 scale
   - Formula: `(creditScore - 300) / 5.5`
   - Higher credit scores result in higher component values

2. **Loan Repayment History Component (30% weight)**
   - Calculates the percentage of on-time payments
   - Formula: `(successfulPayments / totalPayments) * 100`
   - More on-time payments result in higher component values

3. **Debt-to-Income Ratio Component (20% weight)**
   - Evaluates the customer's debt level relative to income
   - Formula: `100 - min(100, debtRatio * 8)`
   - Lower debt ratios result in higher component values

The final risk score is calculated as a weighted average of these components:
```
riskScore = (creditScoreComponent * 0.5) + (repaymentComponent * 0.3) + (debtRatioComponent * 0.2)
```

Risk levels are determined based on the final score:
- High Risk: Score < 40
- Medium Risk: Score 40-69
- Low Risk: Score ≥ 70


## Bonus Features

- Dark mode toggle with localStorage persistence
- Responsive mobile design
- Advanced filtering and searching in customer table
- Interactive charts with tooltips and animations

## License

This project is created for the KYC Hub Frontend Engineering Coding Challenge and is not licensed for public distribution.

---

Created by Sayam Jain for KYC Hub Frontend Engineering Coding Challenge.