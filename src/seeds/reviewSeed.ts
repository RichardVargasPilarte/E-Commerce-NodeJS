import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Review from './../models/review';
import Product from './../models/product';

dotenv.config();

const DB_URI = process.env.MONGO_URI || '';

const seedReviews = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('🟢 Connected to MongoDB for seeding reviews');

    const products = await Product.find();

    if (products.length < 10) {
      throw new Error('❗ You need at least 10 products in the database to seed reviews.');
    }

    const comments = [
      'Disappointing quality. Would not recommend.',
      'Not what I expected at all.',
      'Stopped working after a few days.',
      'Average product. Gets the job done.',
      'Okay for the price. Nothing special.',
      'Does what it promises. No complaints.',
      'Solid performance. Satisfied overall.',
      'Very good! I’m impressed.',
      'Excellent design and functionality.',
      'One of the best purchases I’ve made.',
    ];

    const reviewData = products.map((product, index) => {
      let rating;

      if (index < 3) {
        // Poor ratings (1 or 2)
        rating = Math.floor(Math.random() * 2) + 1;
      } else if (index < 7) {
        // Average ratings (3)
        rating = 3;
      } else {
        // Good ratings (4 or 5)
        rating = Math.floor(Math.random() * 2) + 4;
      }

      return {
        product: product._id,
        rating,
        comment: comments[index],
      };
    });

    await Review.deleteMany(); // Clear previous reviews
    await Review.insertMany(reviewData);

    console.log('✅ Reviews successfully seeded');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding reviews:', error);
    process.exit(1);
  }
};

seedReviews();
