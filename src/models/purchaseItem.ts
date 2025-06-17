import mongoose, { Schema, Document } from 'mongoose';

export interface IPurchaseItem extends Document {
    quantity: number;
    unit_price: number;
    subtotal: number;
    purchase: mongoose.Types.ObjectId;
    product: mongoose.Types.ObjectId;
}

const PurchaseItemSchema = new Schema<IPurchaseItem>({
    quantity: {
        type: Number,
        required: true
    },
    unit_price: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    purchase: {
        type: Schema.Types.ObjectId,
        ref: 'Purchase',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
}, {
    timestamps: true
});

PurchaseItemSchema.pre('save', function (next) {
    this.subtotal = this.quantity * this.unit_price;
    next();
});

export default mongoose.model<IPurchaseItem>('PurchaseItem', PurchaseItemSchema);
