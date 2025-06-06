import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import customerRoutes from './routes/customerRoutes';

const app = express();
const PORT = process.env.PORT || 6000;

app.use(cors({
  origin: [
    'https://credit-theta.vercel.app', 
    'https://credit-e4ooyxxyo-sayamjns-projects.vercel.app',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

app.use('/api', customerRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});