import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Brand from './../models/brand';

dotenv.config();

const brands = [
  { name: 'Apple', description: 'Innovative technology and electronics' },
  { name: 'Samsung', description: 'Consumer electronics and appliances' },
  { name: 'Nike', description: 'Sportswear and athletic gear' },
  { name: 'Adidas', description: 'Global sportswear brand' },
  { name: 'Sony', description: 'Electronics, gaming, and entertainment' },
  { name: 'LG', description: 'Home appliances and electronics' },
  { name: 'Dell', description: 'Computers and related products' },
  { name: 'HP', description: 'Personal computers and printers' },
  { name: 'Lenovo', description: 'Innovative computing solutions' },
  { name: 'Under Armour', description: 'Performance apparel and gear' }
];

const seedBrands = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('🟢 MongoDB connected');

    await Brand.deleteMany(); // Clean the collection
    await Brand.insertMany(brands); // Insert new data

    console.log('✅ Brands successfully seeded');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding brands:', error);
    process.exit(1);
  }
};

seedBrands();
