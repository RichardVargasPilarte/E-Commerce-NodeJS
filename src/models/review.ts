import { Schema, model, Document } from 'mongoose';
import { Types } from 'mongoose';

export interface IReview extends Document {
  rating: Number;
  comment?: string;
  product: Types.ObjectId;
  user: Types.ObjectId;
}

const ReviewSchema = new Schema<IReview>({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    trim: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
});

export default model<IReview>('Review', ReviewSchema);
