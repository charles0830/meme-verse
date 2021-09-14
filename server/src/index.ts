import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { errorHandler, notFound } from './middleware/errorMiddleware';
import userRoutes from './routes/userRoutes';
import memeRoutes from './routes/memeRoutes';

// load environment variables
dotenv.config();

const main = async () => {
  // connect database
  await connectDB();

  // init express app
  const app = express();

  app.use(express.json());

  // routes
  app.get('/', (req, res) => {
    res.send('Meme-verse server running and up...');
  });
  app.use('/api/user', userRoutes);
  app.use('/api/meme', memeRoutes);

  // error middleware
  app.use(notFound);
  app.use(errorHandler);

  // listening
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`\nmeme-verse server running on port ${PORT}`);
  });
};

main().catch((error) => console.log(error));
