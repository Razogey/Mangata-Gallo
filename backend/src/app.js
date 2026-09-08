import "dotenv/config";
import express from 'express';
import cors from 'cors';
import prisma from './config/prisma.js';
import productRoutes from './routes/productRoutes.js';
import collectionRoutes from './routes/collectionRoutes.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

app.use('/api/collections', collectionRoutes)

app.get("/api/db-test", async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;

        res.json({
            status: 'ok',
            message: 'Database connection is working!'
        })
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Database connection failed!'
        });
    }
})

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Mangata & Gallo API is running!' });
});

export default app;