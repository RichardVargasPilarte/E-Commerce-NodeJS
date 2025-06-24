import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Payment, { PaymentMethod, PaymentStatus } from './../models/payment';
import Order from './../models/order';

dotenv.config();

const DB_URI = process.env.MONGO_URI || '';

// Fisher–Yates shuffle (forma justa y eficiente)
function fisherYatesShuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

async function seedPayments() {
  try {
    await mongoose.connect(DB_URI);
    console.log('🟢 Connected to MongoDB for seeding payments');

    const orders = await Order.find();

    if (orders.length < 4) {
      throw new Error('❗ You need at least 4 orders in the database to seed payments.');
    }

    await Payment.deleteMany(); // Limpiar pagos anteriores

    // Usar Fisher-Yates para mezclar aleatoriamente
    const shuffledOrders = fisherYatesShuffle(orders).slice(0, 4);

    const paymentConfigs = [
      {
        method: PaymentMethod.PAYPAL,
        status: PaymentStatus.COMPLETED,
        transaction_id: 'PAYPAL_TXN_001',
        paid_at: new Date(),
      },
      {
        method: PaymentMethod.STRIPE,
        status: PaymentStatus.REFUNDED,
        transaction_id: 'STRIPE_TXN_987',
        paid_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // hace 3 días
      },
      {
        method: PaymentMethod.BANK_TRANSFER,
        status: PaymentStatus.PENDING,
        bank_name: 'Banco Nacional',
        sender_name: 'Ricardo Vargas',
        reference_image: 'https://example.com/uploads/transfer-proof.jpg',
      },
      {
        method: PaymentMethod.CASH,
        status: PaymentStatus.FAILED,
        paid_at: new Date(),
      }
    ];

    for (let i = 0; i < 4; i++) {
      const order = shuffledOrders[i];
      const config = paymentConfigs[i];

      await Payment.create({
        order: order._id,
        amount: order.total_price,
        ...config
      });

      console.log(`💳 Payment for order ${order._id} using ${config.method} created`);
    }

    console.log('✅ Payments successfully seeded');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding payments:', error);
    process.exit(1);
  }
}

seedPayments();
