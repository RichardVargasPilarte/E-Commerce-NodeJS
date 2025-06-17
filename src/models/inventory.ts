import mongoose, { Schema, Document } from 'mongoose';

export interface IInventory extends Document {
    stock: number;
    min_stock: number;
    max_stock: number;
    last_updated: Date;
    product: mongoose.Types.ObjectId;
}

const InventorySchema = new Schema<IInventory>({
    stock: {
        type: Number,
        default: 0,
        required: true
    },
    min_stock: {
        type: Number,
        default: 5,
        required: true
    },
    max_stock: {
        type: Number,
        required: true
    },
    last_updated: {
        type: Date,
        default: Date.now
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

export default mongoose.model<IInventory>('Inventory', InventorySchema);
