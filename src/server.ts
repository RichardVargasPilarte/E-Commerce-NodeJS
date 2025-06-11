import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI || '';

const startServer = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('Database connected');

    app.listen(PORT, () => {
      console.log(` 🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(' 🛑 Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
