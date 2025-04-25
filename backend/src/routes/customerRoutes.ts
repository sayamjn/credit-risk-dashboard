import express from 'express';
import fs from 'fs';
import path from 'path';
import { Customer } from '../utils/riskScoring';
import { calculateRiskScore } from '../utils/riskScoring';

const router = express.Router();
const dataPath = path.join(__dirname, '../../data/customers.json');

router.get('/customers', (req, res) => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    const customers: Customer[] = JSON.parse(data);
    
    const customersWithRisk = customers.map(customer => ({
      ...customer,
      riskAssessment: calculateRiskScore(customer)
    }));
    
    res.json(customersWithRisk);
  } catch (error) {
    console.error('Error reading customers:', error);
    res.status(500).json({ error: 'Failed to retrieve customers' });
  }
});

router.get('/customers/:id', (req, res) => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    const customers: Customer[] = JSON.parse(data);
    
    const customer = customers.find(c => c.customerId === req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    const customerWithRisk = {
      ...customer,
      riskAssessment: calculateRiskScore(customer)
    };
    
    res.json(customerWithRisk);
  } catch (error) {
    console.error('Error reading customer:', error);
    res.status(500).json({ error: 'Failed to retrieve customer' });
  }
});

router.put('/customers/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    if (!status || !['Review', 'Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const data = fs.readFileSync(dataPath, 'utf8');
    const customers: Customer[] = JSON.parse(data);
    
    const customerIndex = customers.findIndex(c => c.customerId === req.params.id);
    if (customerIndex === -1) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    customers[customerIndex].status = status as Customer['status'];
    
    fs.writeFileSync(dataPath, JSON.stringify(customers, null, 2));
    
    const updatedCustomer = {
      ...customers[customerIndex],
      riskAssessment: calculateRiskScore(customers[customerIndex])
    };
    
    res.json(updatedCustomer);
  } catch (error) {
    console.error('Error updating customer status:', error);
    res.status(500).json({ error: 'Failed to update customer status' });
  }
});

router.post('/alerts', (req, res) => {
  try {
    const { customerId, riskScore } = req.body;
    
    if (!customerId || typeof riskScore !== 'number') {
      return res.status(400).json({ error: 'Invalid request data' });
    }
    
    console.log(`[ALERT] High-risk customer detected: ${customerId} with risk score ${riskScore}`);
    
    setTimeout(() => {
      res.json({ 
        success: true, 
        message: `Alert created for high-risk customer: ${customerId}` 
      });
    }, 500);
  } catch (error) {
    console.error('Error creating alert:', error);
    res.status(500).json({ error: 'Failed to create alert' });
  }
});

export default router;