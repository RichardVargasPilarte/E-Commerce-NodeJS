import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Review from '@models/review';
import Product from '@models/product';
import User from '@models/user';

dotenv.config();

async function seedReviews() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('🟢 MongoDB connected');

    const products = await Product.find().limit(3);
    const customers = await User.find({ userRole: 'customer' }).limit(3);

    if (products.length === 0 || customers.length === 0) {
      throw new Error('At least 1 product and 1 user with a customer role is required');
    }

    for (const customer of customers) {
      for (const product of products) {
        const rating = Math.floor(Math.random() * 5) + 1;

        await Review.create({
          rating,
          comment: `Review of the qualified test ${rating}`,
          product: product._id,
          user: customer._id
        });

        // Solo una reseña por producto por usuario (gracias al índice único)
        break;
      }
    }

    console.log('✅ Reviews created correctly');
    process.exit(0);

  } catch (err) {
    console.error('❌ Error when creating reviews:', err);
    process.exit(1);
  }
}

seedReviews();
