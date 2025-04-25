# Credit Risk Analytics Dashboard - Setup Guide

This guide will help you set up and run the Credit Risk Analytics Dashboard application on your local machine.

## Prerequisites

Make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- Git

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd credit-risk-dashboard
```

### 2. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The backend server will start on http://localhost:5000

### 3. Frontend Setup

Open a new terminal window/tab.

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend application will start on http://localhost:3000

## Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## Features Overview

Once the application is running, you can explore:

1. **Dashboard Overview**
   - Financial metrics dashboard
   - Income vs expenses chart
   - Risk distribution visualization
   - Customers table with sorting and filtering

2. **Risk Assessment**
   - Detailed risk analysis for each customer
   - Risk factor breakdown
   - Status management

3. **Workflow Management**
   - Customer status updates
   - High-risk customer alerts
   - Status change tracking

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/customers` - Get all customers with risk assessment
- `GET /api/customers/:id` - Get a single customer by ID
- `PUT /api/customers/:id/status` - Update customer status
- `POST /api/alerts` - Create an alert for high-risk customers

## Troubleshooting

- **CORS Issues**: If you encounter CORS problems, make sure both frontend and backend are running and the proxy configuration in `vite.config.ts` is correct.

- **Data Not Loading**: Check the browser's console for API errors. The application is set to connect to the backend at http://localhost:5000.

- **Build Issues**: Make sure you have the correct versions of Node.js and npm installed. Run `node -v` and `npm -v` to check.