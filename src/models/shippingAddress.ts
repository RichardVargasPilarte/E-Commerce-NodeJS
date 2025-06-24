import mongoose, { Schema, Document } from 'mongoose';

export interface IShippingAddress extends Document {
    user: mongoose.Types.ObjectId;
    full_name: string;
    address: string;
    city: string;
    state?: string;
    postal_code: string;
    country: string;
    phone: string;
    is_default: boolean;
}

const ShippingAddressSchema = new Schema<IShippingAddress>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    full_name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        trim: true
    },
    postal_code: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    is_default: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export default mongoose.model<IShippingAddress>('ShippingAddress', ShippingAddressSchema);
