import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Purchase from '@models/purchase';
import PurchaseItem from '@models/purchaseItem';
import Product from '@models/product';
import Supplier from '@models/supplier';
import User from '@models/user';

dotenv.config();

async function seedPurchases() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('🟢 MongoDB connected');

        // ✅ Buscar un usuario existente (por ejemplo, el admin)
        const user = await User.findOne({ userRole: { $in: ['admin', 'seller'] } });
        if (!user) throw new Error('No admin or seller user found. Please seed users first.');

        // Buscar proveedor y productos
        const supplier = await Supplier.findOne();
        const products = await Product.find().limit(2);

        if (!supplier || products.length < 2) {
            throw new Error('At least 1 supplier and 2 products in the database are needed');
        }

        // Crear la compra
        const purchase = new Purchase({
            supplier: supplier._id,
            reference_code: 'PUR-20240601-001',
            date: new Date(),
            total_amount: 0,
            status: 'received',
            notes: 'Initial Supplier Purchase',
            created_by: user._id // ✅ Añade el usuario creador
        });

        await purchase.save();

        // Crear ítems
        let total = 0;
        for (const product of products) {
            const quantity = Math.floor(Math.random() * 10) + 1;
            const unit_price = product.price || 10;
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

        // Actualizar total
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
