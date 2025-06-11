import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('🟢 Conectado a MongoDB');
  } catch (error) {
    console.error('🔴 Error al conectar a MongoDB:', error);
    process.exit(1); // Finaliza el proceso si no se conecta
  }
};
