import mongoose, { Schema, Document } from 'mongoose';

export interface ISupplier extends Document {
    name: string;
    contact_name: string;
    email: string;
    phone: string;
    address: string;
    company?: string;
    country: string;
    website?: string;
    notes?: string;
}

const SupplierSchema = new Schema<ISupplier>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    contact_name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    notes: {
        type: String,
        trim: true
    }

}, {
    timestamps: true
});

SupplierSchema.methods.toJSON = function () {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
};

export default mongoose.model<ISupplier>('Supplier', SupplierSchema);
