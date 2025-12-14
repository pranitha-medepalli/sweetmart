import mongoose from 'mongoose';

/**
 * Database connection configuration
 * Handles MongoDB connection with proper error handling
 */
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/sweetmart',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    throw error;
  }
};

/**
 * Close database connection
 */
export const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing database connection:', error);
    throw error;
  }
};

