import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import customerRoutes from './routes/customerRoutes';

const app = express();
const PORT = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', customerRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});