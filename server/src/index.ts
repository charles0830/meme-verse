import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import connectDB from './config/db';
import { errorHandler, notFound } from './middleware/errorMiddleware';
import memeRoutes from './routes/memeRoutes';
import uploadRoutes from './routes/uploadRoutes';
import userRoutes from './routes/userRoutes';

// load environment variables
dotenv.config();

const main = async () => {
  // connect database
  await connectDB();

  // init express app
  const app = express();

  app.use(express.json());

  // cors
  app.use(
    cors({
      origin: ['http://localhost:3000', 'https://meme-verse-web.netlify.app'],
    })
  );

  // routes
  app.get('/', (req, res) => {
    res.send('Meme-verse server running and up...');
  });
  app.use('/api/user', userRoutes);
  app.use('/api/meme', memeRoutes);
  app.use('/api/upload', uploadRoutes);
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

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
