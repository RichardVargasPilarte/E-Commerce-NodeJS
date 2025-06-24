import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  items: ICartItem[];
  created_at: Date;
  updated_at: Date;
  total_price: number; // Precio total del carrito
}

const CartItemSchema = new Schema<ICartItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const CartSchema = new Schema<ICart>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // Solo un carrito por usuario
  },
  items: [CartItemSchema],
  total_price: {
    type: Number,
    default: 0
  }
}, {
    timestamps: true
});

export default mongoose.model<ICart>('Cart', CartSchema);
