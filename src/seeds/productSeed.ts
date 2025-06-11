import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './../models/product';
import Category from './../models/category';

dotenv.config();

const DB_URI = process.env.MONGO_URI || '';

const seedProducts = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('🟢 Connected to MongoDB for seeding products');

    const categories = await Category.find();

    if (categories.length < 10) {
      throw new Error('❗ You need 10 categories to seed 10 products.');
    }

    const products = [
      {
        name: 'Bluetooth Speaker',
        description: 'Portable speaker with high-quality sound and Bluetooth 5.0',
        price: 49.99,
        stock: 100,
        category: categories.find(c => c.name === 'Electronics')?._id,
      },
      {
        name: 'Men\'s Casual T-Shirt',
        description: '100% cotton slim-fit t-shirt',
        price: 19.99,
        stock: 200,
        category: categories.find(c => c.name === 'Clothing')?._id,
      },
      {
        name: 'Non-stick Frying Pan',
        description: 'Durable frying pan with ceramic coating',
        price: 25.00,
        stock: 150,
        category: categories.find(c => c.name === 'Home & Kitchen')?._id,
      },
      {
        name: 'Yoga Mat',
        description: 'Eco-friendly yoga mat with anti-slip surface',
        price: 29.99,
        stock: 120,
        category: categories.find(c => c.name === 'Sports')?._id,
      },
      {
        name: 'Facial Cleanser',
        description: 'Gentle foaming cleanser for all skin types',
        price: 12.50,
        stock: 90,
        category: categories.find(c => c.name === 'Beauty & Personal Care')?._id,
      },
      {
        name: 'Educational Puzzle',
        description: 'Colorful puzzle game for children aged 4+',
        price: 14.99,
        stock: 80,
        category: categories.find(c => c.name === 'Toys')?._id,
      },
      {
        name: 'Thriller Novel: Dark Days',
        description: 'Bestselling thriller novel with unexpected twists',
        price: 9.99,
        stock: 300,
        category: categories.find(c => c.name === 'Books')?._id,
      },
      {
        name: 'Dog Chew Toy',
        description: 'Durable rubber toy for dogs of all sizes',
        price: 8.75,
        stock: 60,
        category: categories.find(c => c.name === 'Pet Supplies')?._id,
      },
      {
        name: 'Wireless Keyboard & Mouse Combo',
        description: 'Ergonomic wireless peripherals with long battery life',
        price: 39.99,
        stock: 70,
        category: categories.find(c => c.name === 'Technology')?._id,
      },
      {
        name: 'Car Phone Mount',
        description: '360° rotating mount for dashboard or windshield',
        price: 11.99,
        stock: 110,
        category: categories.find(c => c.name === 'Automotive')?._id,
      }
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
