import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './../models/user'; 

dotenv.config();

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('🟢 MongoDB connected');

    await User.deleteMany({});

    const usersData = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        username: 'admin_user',
        phone: '1234567890',
        address: 'Admin Street, System City',
        userRole: 'admin'
      },
      {
        name: 'Seller User',
        email: 'seller@example.com',
        password: 'seller123',
        username: 'seller_user',
        phone: '2345678901',
        address: 'Seller Ave, Commerce Town',
        userRole: 'seller'
      },
      {
        name: 'Customer User',
        email: 'customer@example.com',
        password: 'customer123',
        username: 'customer_user',
        phone: '3456789012',
        address: 'Customer Blvd, Shopping City',
        userRole: 'customer'
      }
    ];

    for (const userData of usersData) {

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      const newUser = new User({
        ...userData,
        password: hashedPassword
      });

      await newUser.save();
    }

    console.log('✅ Users created successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating users:', error);
    process.exit(1);
  }
}

seedUsers();
