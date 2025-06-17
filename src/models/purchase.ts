import mongoose, { Schema, Document } from 'mongoose';

export enum PurchaseStatus {
    PENDING = 'pending',
    RECEIVED = 'received',
    CANCELLED = 'cancelled'
}

export interface IPurchase extends Document {
    reference_code: string;
    date: Date;
    total_amount: number;
    status: PurchaseStatus;
    notes?: string;
    supplier: mongoose.Types.ObjectId;
}


const PurchaseSchema = new Schema<IPurchase>({
    reference_code: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    total_amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(PurchaseStatus),
        default: PurchaseStatus.PENDING
    },
    notes: {
        type: String,
        trim: true
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
}, {
    timestamps: true
});

export default mongoose.model<IPurchase>('Purchase', PurchaseSchema);
