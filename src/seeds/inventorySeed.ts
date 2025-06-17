import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './../models/product';
import Inventory from './../models/inventory';

dotenv.config();

async function seedInventory() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('🟢 MongoDB connected');

        const products = await Product.find();

        if (products.length === 0) {
            console.log('⚠️ No products were found to allocate inventory.');
            process.exit(0);
        }

        let createdCount = 0;

        for (const product of products) {
            const exists = await Inventory.findOne({ product: product._id });
            if (!exists) {
                await Inventory.create({
                    product: product._id,
                    stock: 10,        // Stock inicial
                    min_stock: 5,     // Mínimo recomendado
                    max_stock: 50,    // Máximo permitido
                    last_updated: new Date()
                });
                createdCount++;
            }
        }

        console.log(`✅ Inventory created for ${createdCount} products.`);
        process.exit(0);

    } catch (error) {
        console.error('❌ Error creating inventory:', error);
        process.exit(1);
    }
}

seedInventory();
