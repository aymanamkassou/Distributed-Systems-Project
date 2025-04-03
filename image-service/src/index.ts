import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import imageRoutes from './routes/imageRoutes';

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.use('/api/images', imageRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
  });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Image service running on port ${PORT}`);
}); 