import { Schema, model, Document } from 'mongoose';
import { Types } from 'mongoose';

export interface IReview extends Document {
  rating: Number;
  comment?: string;
  product: Types.ObjectId;
}

const ReviewSchema = new Schema<IReview>({
  rating: {
    type: Number,
    required: true,
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

}, {
  timestamps: true,
});

export default model<IReview>('Review', ReviewSchema);
