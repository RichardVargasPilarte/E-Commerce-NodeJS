import mongoose, { Schema, Document } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  SELLER = 'seller',
  CUSTOMER = 'customer'
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  username: string;
  phone?: string;
  address?: string;
  is_active: boolean;
  avatar?: string;
  userRole: UserRole;
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
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    unique: true,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  userRole: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.CUSTOMER
  },
  is_active: {
    type: Boolean,
    default: true
  },
  avatar: {
    type: String
  }
});

UserSchema.methods.toJSON = function () {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
}

export default mongoose.model<IUser>('User', UserSchema);
