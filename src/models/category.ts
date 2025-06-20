import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description?: string;
  state: boolean;
}

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
  state: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true
});

CategorySchema.methods.toJSON = function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
};

export default mongoose.model<ICategory>('Category', CategorySchema);
