import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ReturnRequest, { ReturnStatus } from '@models/returnRequest';
import User from '@models/user';
import Order from '@models/order';

dotenv.config();
const DB_URI = process.env.MONGO_URI || '';

function getRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

async function seedReturnRequests() {
  try {
    await mongoose.connect(DB_URI);
    console.log('🟢 Connected to MongoDB for seeding return requests');

    const customers = await User.find({ userRole: 'customer' });
    const orders = await Order.find();

    if (customers.length < 4 || orders.length < 4) {
      throw new Error('❗ Need at least 4 customers and 4 orders to seed return requests.');
    }

    await ReturnRequest.deleteMany();

    const requestData = [
      {
        reason: 'El producto llegó dañado',
        status: ReturnStatus.REQUESTED,
        image_evidence: 'https://example.com/uploads/broken-product.jpg'
      },
      {
        reason: 'Me enviaron el producto equivocado',
        status: ReturnStatus.APPROVED
      },
      {
        reason: 'No cumplió con mis expectativas',
        status: ReturnStatus.REJECTED
      },
      {
        reason: 'Ya no lo necesito, deseo devolverlo',
        status: ReturnStatus.PROCESSED
      }
    ];

    for (const data of requestData) {
      const randomUser = getRandom(customers);
      const randomOrder = getRandom(orders);

      await ReturnRequest.create({
        ...data,
        user: randomUser._id,
        order: randomOrder._id
      });

      console.log(`📦 Return request for ${randomUser.email} on order ${randomOrder._id}`);
    }

    console.log('✅ Return requests seeded successfully with all statuses');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding return requests:', error);
    process.exit(1);
  }
}

seedReturnRequests();
