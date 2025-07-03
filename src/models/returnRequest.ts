import mongoose, { Schema, Document } from 'mongoose';

export enum ReturnStatus {
  REQUESTED = 'requested',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PROCESSED = 'processed'
}

export interface IReturnRequest extends Document {
  order: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  reason: string;
  status: ReturnStatus;
  created_at: Date;
  updated_at: Date;
  image_evidence?: string; // URL de una imagen del daño o problema
}

const ReturnRequestSchema = new Schema<IReturnRequest>({
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reason: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: Object.values(ReturnStatus),
    default: ReturnStatus.REQUESTED
  },
  image_evidence: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.model<IReturnRequest>('ReturnRequest', ReturnRequestSchema);
