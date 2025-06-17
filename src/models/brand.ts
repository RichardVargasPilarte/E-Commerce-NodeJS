import { Schema, model, Document } from 'mongoose';

export interface IBrand extends Document {
  name: string;
  description: string;
}

const BrandSchema = new Schema<IBrand>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
});

export default model<IBrand>('Brand', BrandSchema);
