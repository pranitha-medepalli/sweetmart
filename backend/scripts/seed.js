import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.model.js';
import Sweet from '../models/Sweet.model.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sweetmart';

// Helper function to generate image URL with sweet name
const getImageUrl = (sweetName) => {
  const encodedName = encodeURIComponent(sweetName);
  // Using placeholder.com with Indian sweet colors (golden/yellow theme)
  return `https://via.placeholder.com/400x300/FFD700/8B4513?text=${encodedName}`;
};

const seedData = async () => {
  try {
    // Connect to database
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Sweet.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@sweetmart.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log('Admin user created:', admin.email);

    // Create regular user
    const user = await User.create({
      name: 'Test User',
      email: 'user@sweetmart.com',
      password: 'user123',
      role: 'user',
    });
    console.log('Regular user created:', user.email);

    // Create sample sweets with Indian sweet images
    const sweets = [
      {
        name: 'Kaju Katli',
        category: 'Kaju Katli',
        price: 450.00,
        quantity: 50,
        image: getImageUrl('Kaju Katli'),
        description: 'Delicious cashew-based diamond-shaped sweet with silver leaf decoration, a favorite during Diwali',
      },
      {
        name: 'Gulab Jamun',
        category: 'Gulab Jamun',
        price: 300.00,
        quantity: 40,
        image: getImageUrl('Gulab Jamun'),
        description: 'Soft, spongy milk-based sweet balls soaked in rose-flavored sugar syrup, served warm or cold',
      },
      {
        name: 'Rasgulla',
        category: 'Rasgulla',
        price: 250.00,
        quantity: 60,
        image: getImageUrl('Rasgulla'),
        description: 'Spongy cottage cheese balls in light sugar syrup, originating from Odisha, India',
      },
      {
        name: 'Jalebi',
        category: 'Jalebi',
        price: 200.00,
        quantity: 35,
        image: getImageUrl('Jalebi'),
        description: 'Crispy, syrupy spiral-shaped sweet made from deep-fried maida flour, popular across India',
      },
      {
        name: 'Barfi',
        category: 'Barfi',
        price: 350.00,
        quantity: 45,
        image: getImageUrl('Barfi'),
        description: 'Rich, dense milk-based sweet with various flavors like pistachio, almond, and coconut',
      },
      {
        name: 'Laddoo',
        category: 'Laddoo',
        price: 280.00,
        quantity: 55,
        image: getImageUrl('Laddoo'),
        description: 'Round, sweet balls made from flour, sugar, and ghee, available in besan, rava, and coconut varieties',
      },
      {
        name: 'Rasmalai',
        category: 'Rasgulla',
        price: 320.00,
        quantity: 30,
        image: getImageUrl('Rasmalai'),
        description: 'Soft flattened cheese balls soaked in sweetened, thickened milk flavored with cardamom and saffron',
      },
      {
        name: 'Halwa',
        category: 'Halwa',
        price: 280.00,
        quantity: 40,
        image: getImageUrl('Halwa'),
        description: 'Sweet dense confection made from semolina, carrots, or other ingredients, cooked in ghee',
      },
      {
        name: 'Peda',
        category: 'Mithai',
        price: 380.00,
        quantity: 50,
        image: getImageUrl('Peda'),
        description: 'Soft, milk-based sweet from Mathura, made with khoya, sugar, and flavored with cardamom',
      },
      {
        name: 'Soan Papdi',
        category: 'Mithai',
        price: 220.00,
        quantity: 65,
        image: getImageUrl('Soan Papdi'),
        description: 'Flaky, layered sweet made from gram flour, sugar, ghee, and cardamom, melts in the mouth',
      },
      {
        name: 'Besan Laddoo',
        category: 'Laddoo',
        price: 300.00,
        quantity: 48,
        image: getImageUrl('Besan Laddoo'),
        description: 'Traditional sweet balls made from roasted gram flour, ghee, sugar, and nuts',
      },
      {
        name: 'Kheer',
        category: 'Halwa',
        price: 180.00,
        quantity: 25,
        image: getImageUrl('Kheer'),
        description: 'Creamy rice pudding made with milk, rice, sugar, and flavored with cardamom and saffron',
      },
      {
        name: 'Modak',
        category: 'Mithai',
        price: 250.00,
        quantity: 42,
        image: getImageUrl('Modak'),
        description: 'Sweet dumplings made from rice flour, filled with jaggery and coconut, favorite of Lord Ganesha',
      },
      {
        name: 'Puran Poli',
        category: 'Mithai',
        price: 200.00,
        quantity: 38,
        image: getImageUrl('Puran Poli'),
        description: 'Sweet flatbread stuffed with sweetened chana dal, popular in Maharashtra and Gujarat',
      },
      {
        name: 'Gajar Ka Halwa',
        category: 'Halwa',
        price: 290.00,
        quantity: 35,
        image: getImageUrl('Gajar Ka Halwa'),
        description: 'Carrot pudding made with grated carrots, milk, sugar, and ghee, garnished with nuts',
      },
    ];

    const createdSweets = await Sweet.insertMany(sweets);
    console.log(`Created ${createdSweets.length} sweets`);

    console.log('\n✅ Seed data created successfully!');
    console.log('\nLogin credentials:');
    console.log('Admin - Email: admin@sweetmart.com, Password: admin123');
    console.log('User - Email: user@sweetmart.com, Password: user123');
    console.log(`\nTotal sweets in database: ${createdSweets.length}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
