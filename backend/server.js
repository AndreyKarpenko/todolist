import express from 'express';
import cors from 'cors';
import productRoutes from './productRoutes.js';

const port = process.env.PORT;

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));
