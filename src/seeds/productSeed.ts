import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './../models/product';
import Category from './../models/category';
import Brand from './../models/brand';

dotenv.config();

const DB_URI = process.env.MONGO_URI || '';

const seedProducts = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('🟢 Connected to MongoDB for seeding products');

    const categories = await Category.find();
    const brands = await Brand.find();

    if (categories.length < 10) {
      throw new Error('❗ You need at least 10 categories to seed products.');
    }

    if (brands.length < 10) {
      throw new Error('❗ You need at least 10 brands to seed products.');
    }

    const products = [
      {
        name: 'iPhone 14 Pro',
        description: 'Smartphone with A16 Bionic chip and ProMotion display',
        price: 999.99,
        stock: 50,
        category: categories.find(c => c.name === 'Electronics')?._id,
        brand: brands.find(b => b.name === 'Apple')?._id,
      },
      {
        name: 'Galaxy S23 Ultra',
        description: 'Samsung flagship phone with top-tier performance and camera',
        price: 949.99,
        stock: 60,
        category: categories.find(c => c.name === 'Electronics')?._id,
        brand: brands.find(b => b.name === 'Samsung')?._id,
      },
      {
        name: 'Nike Air Max',
        description: 'Comfortable and stylish running shoes',
        price: 120.00,
        stock: 100,
        category: categories.find(c => c.name === 'Clothing')?._id,
        brand: brands.find(b => b.name === 'Nike')?._id,
      },
      {
        name: 'Adidas Ultraboost',
        description: 'High-performance running shoes with responsive cushioning',
        price: 130.00,
        stock: 80,
        category: categories.find(c => c.name === 'Clothing')?._id,
        brand: brands.find(b => b.name === 'Adidas')?._id,
      },
      {
        name: 'Sony WH-1000XM5',
        description: 'Noise cancelling wireless headphones',
        price: 349.99,
        stock: 70,
        category: categories.find(c => c.name === 'Technology')?._id,
        brand: brands.find(b => b.name === 'Sony')?._id,
      },
      {
        name: 'LG OLED TV 55"',
        description: '4K Smart OLED TV with AI Picture Pro',
        price: 1199.99,
        stock: 40,
        category: categories.find(c => c.name === 'Home & Kitchen')?._id,
        brand: brands.find(b => b.name === 'LG')?._id,
      },
      {
        name: 'Dell XPS 13',
        description: 'Compact and powerful ultrabook with InfinityEdge display',
        price: 1099.99,
        stock: 30,
        category: categories.find(c => c.name === 'Technology')?._id,
        brand: brands.find(b => b.name === 'Dell')?._id,
      },
      {
        name: 'HP Envy Printer',
        description: 'All-in-one wireless printer with mobile printing',
        price: 149.99,
        stock: 90,
        category: categories.find(c => c.name === 'Technology')?._id,
        brand: brands.find(b => b.name === 'HP')?._id,
      },
      {
        name: 'Lenovo ThinkPad E15',
        description: 'Business laptop with powerful performance and security features',
        price: 899.99,
        stock: 40,
        category: categories.find(c => c.name === 'Technology')?._id,
        brand: brands.find(b => b.name === 'Lenovo')?._id,
      },
      {
        name: 'Under Armour Sports T-Shirt',
        description: 'Lightweight and breathable training shirt',
        price: 34.99,
        stock: 150,
        category: categories.find(c => c.name === 'Sports')?._id,
        brand: brands.find(b => b.name === 'Under Armour')?._id,
      },
    ];

    await Product.deleteMany(); // Clean previous entries
    await Product.insertMany(products);

    console.log('✅ Products successfully seeded');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
