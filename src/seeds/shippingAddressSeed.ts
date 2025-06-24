import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ShippingAddress from './../models/shippingAddress';
import User from './../models/user';

dotenv.config();
const DB_URI = process.env.MONGO_URI || '';

async function seedShippingAddresses() {
    try {
        await mongoose.connect(DB_URI);
        console.log('🟢 Connected to MongoDB for seeding shipping addresses');

        const customers = await User.find({ userRole: 'customer' }).limit(3);

        if (customers.length === 0) {
            throw new Error('❗ No customer users found to assign addresses');
        }

        await ShippingAddress.deleteMany(); // Clean previous addresses

        const countries = ['Nicaragua', 'Costa Rica', 'Panamá'];

        for (let i = 0; i < customers.length; i++) {
            await ShippingAddress.create({
                user: customers[i]._id,
                full_name: customers[i].name,
                address: `Calle Principal #${i + 1}`,
                city: 'Managua',
                state: 'Managua',
                postal_code: `1000${i}`,
                country: countries[i % countries.length],
                phone: `8888-000${i}`,
                is_default: true
            });

            console.log(`📦 Address added for ${customers[i].email}`);
        }

        console.log('✅ Shipping addresses seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding shipping addresses:', error);
        process.exit(1);
    }
}

seedShippingAddresses();
