import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Cart from './../models/cart';
import User from './../models/user';
import Product from './../models/product';

dotenv.config();

const DB_URI = process.env.MONGO_URI || '';

async function seedCarts() {
    try {
        await mongoose.connect(DB_URI);
        console.log('🟢 Connected to MongoDB for seeding carts');

        const customers = await User.find({ userRole: 'customer' }).limit(3);
        const products = await Product.find().limit(10);

        if (customers.length === 0 || products.length === 0) {
            throw new Error('❗ At least 1 customer and 1 product are required to seed carts.');
        }

        await Cart.deleteMany(); // Limpiar carritos anteriores

        for (const customer of customers) {
            const cartItems = [];
            let totalPrice = 0;

            // Escoge aleatoriamente entre 2 y 5 productos
            const numItems = Math.floor(Math.random() * 4) + 2;

            const selectedProducts = products
                .sort(() => 0.5 - Math.random()) // Mezclar productos
                .slice(0, numItems);

            for (const product of selectedProducts) {
                const quantity = Math.floor(Math.random() * 3) + 1;
                const subtotal = (product.price || 10) * quantity;

                cartItems.push({
                    product: product._id,
                    quantity
                });

                totalPrice += subtotal;
            }

            await Cart.create({
                user: customer._id,
                items: cartItems,
                total_price: totalPrice
            });

            console.log(`🛒 Cart created for user: ${customer.email}`);
        }

        console.log('✅ Carts seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding carts:', error);
        process.exit(1);
    }
}

seedCarts();
