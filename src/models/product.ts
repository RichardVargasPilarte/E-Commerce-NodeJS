import mongoose, { Schema, Document } from 'mongoose';
import { Types } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: Types.ObjectId;
  image?: string;
  state: boolean;
  brand: Types.ObjectId;
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  image: {
    type: String,
    trim: true
  },
  state: {
    type: Boolean,
    default: true
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
    required: true,
  }
}, {
  timestamps: true
});

ProductSchema.methods.toJSON = function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
};

export default mongoose.model<IProduct>('Product', ProductSchema);
