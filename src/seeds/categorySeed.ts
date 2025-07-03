import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '@models/category';

dotenv.config();

const categories = [
  { name: 'Electronics', description: 'Devices and electronic gadgets' },
  { name: 'Clothing', description: 'Apparel for men, women, and kids' },
  { name: 'Home & Kitchen', description: 'Household items and kitchen tools' },
  { name: 'Sports', description: 'Sporting goods and activewear' },
  { name: 'Beauty & Personal Care', description: 'Cosmetics and self-care products' },
  { name: 'Toys', description: 'Toys and games for all ages' },
  { name: 'Books', description: 'Books of all genres and authors' },
  { name: 'Pet Supplies', description: 'Products for dogs, cats, and other pets' },
  { name: 'Technology', description: 'Computers, tablets, accessories, etc.' },
  { name: 'Automotive', description: 'Accessories and tools for vehicles' }
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('🟢 MongoDB connected');

    await Category.deleteMany(); // Clean the collection
    await Category.insertMany(categories); // Insert new data

    console.log('✅ Categories successfully seeded');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding categories:', error);
    process.exit(1);
  }
};

seedCategories();
