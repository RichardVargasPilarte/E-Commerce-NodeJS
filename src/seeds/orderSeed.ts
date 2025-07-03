import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from '@models/order';
import User from '@models/user';
import Product from '@models/product';

dotenv.config();

const DB_URI = process.env.MONGO_URI || '';

async function seedOrders() {
  try {
    await mongoose.connect(DB_URI);
    console.log('🟢 Connected to MongoDB for seeding orders');

    const customers = await User.find({ userRole: 'customer' });
    const products = await Product.find();

    if (customers.length === 0 || products.length === 0) {
      throw new Error('❗ At least 1 customer and 1 product are required to seed orders.');
    }

    await Order.deleteMany(); // Limpiar órdenes anteriores

    // Crear 10 órdenes
    for (let i = 0; i < 10; i++) {
      const customer = customers[Math.floor(Math.random() * customers.length)];

      const orderItems = [];
      let totalPrice = 0;

      const selectedProducts = products
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 2); // 2 a 4 productos

      for (const product of selectedProducts) {
        const quantity = Math.floor(Math.random() * 3) + 1;
        const price = product.price || 10;
        const subtotal = price * quantity;

        orderItems.push({
          product: product._id,
          quantity,
          price,
          subtotal
        });

        totalPrice += subtotal;
      }

      await Order.create({
        user: customer._id,
        items: orderItems,
        total_price: totalPrice,
        status: 'paid',
        notes: `Test order ${i + 1}`
      });

      console.log(`📦 Order #${i + 1} created for: ${customer.email}`);
    }

    console.log('✅ 10 Orders seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding orders:', error);
    process.exit(1);
  }
}

seedOrders();
