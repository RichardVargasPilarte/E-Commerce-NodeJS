import mongoose, { Schema, Document } from 'mongoose';

export enum PaymentMethod {
    PAYPAL = 'paypal',
    STRIPE = 'stripe',
    BANK_TRANSFER = 'bank_transfer',
    CASH = 'cash'
}

export enum PaymentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    FAILED = 'failed',
    REFUNDED = 'refunded'
}

export interface IPayment extends Document {
    order: mongoose.Types.ObjectId;
    amount: number;
    method: PaymentMethod;
    status: PaymentStatus;
    paid_at?: Date;
    transaction_id?: string;
    bank_name?: string;
    sender_name?: string;
    reference_image?: string;
}

const PaymentSchema = new Schema<IPayment>({
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    method: {
        type: String,
        enum: Object.values(PaymentMethod),
        required: true
    },
    status: {
        type: String,
        enum: Object.values(PaymentStatus),
        default: PaymentStatus.PENDING
    },
    paid_at: {
        type: Date
    },
    transaction_id: {
        type: String,
        trim: true
    },
    bank_name: {
        type: String,
        trim: true
    },
    sender_name: {
        type: String,
        trim: true
    },
    reference_image: {
        type: String // Aquí se guardara la URL o ruta al comprobante de transferencia
    }
}, {
    timestamps: true
});

export default mongoose.model<IPayment>('Payment', PaymentSchema);
