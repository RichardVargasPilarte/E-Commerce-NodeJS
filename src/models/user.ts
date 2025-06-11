import mongoose, { Schema, Document } from 'mongoose';

export type userRole = 'admin' | 'cliente' | 'vendedor';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: userRole;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'cliente', 'vendedor'],
    default: 'cliente'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.toJSON = function() {
    const {__v, _id, password, ...object} = this.toObject();

    object.uid = _id;
    return object;
}

export default mongoose.model<IUser>('User', UserSchema);
