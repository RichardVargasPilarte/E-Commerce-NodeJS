import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Purchase from './../models/purchase';
import PurchaseItem from './../models/purchaseItem';
import Product from './../models/product';
import Supplier from './../models/supplier';

dotenv.config();

async function seedPurchases() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('🟢 MongoDB connected');

        // Get Supplier and Existing Products
        const supplier = await Supplier.findOne(); // Just for the example
        const products = await Product.find().limit(2); // 2 products per purchase

        if (!supplier || products.length < 2) {
            throw new Error('At least 1 supplier and 2 products in the database are needed');
        }

        // Create the purchase
        const purchase = new Purchase({
            supplier: supplier._id,
            reference_code: 'PUR-20240601-001',
            date: new Date(),
            total_amount: 0, // will be updated after the items are added
            status: 'received',
            notes: 'Initial Supplier Purchase'
        });

        await purchase.save();

        // Create the items related to the purchase
        let total = 0;
        for (const product of products) {
            const quantity = Math.floor(Math.random() * 10) + 1;
            const unit_price = product.price || 10; // Example Value
            const subtotal = quantity * unit_price;

            await PurchaseItem.create({
                purchase: purchase._id,
                product: product._id,
                quantity,
                unit_price,
                subtotal
            });

            total += subtotal;
        }

        // Update the total at checkout
        purchase.total_amount = total;
        await purchase.save();

        console.log('✅ Purchase and products created correctly');
        process.exit(0);

    } catch (err) {
        console.error('❌ Error creating data:', err);
        process.exit(1);
    }
}

seedPurchases();
