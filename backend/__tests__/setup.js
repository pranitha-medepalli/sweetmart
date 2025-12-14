import { beforeAll, afterAll, afterEach } from '@jest/globals';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

// Test database connection
const TEST_MONGODB_URI = process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/sweetmart_test';

beforeAll(async () => {
  try {
    await mongoose.connect(TEST_MONGODB_URI);
  } catch (error) {
    console.error('Test database connection error:', error);
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

