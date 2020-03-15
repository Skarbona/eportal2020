import mongoose, { Document, Schema, Model } from 'mongoose';

export enum UserType {
  Admin = 'admin',
  User = 'user',
}

export interface UserInterface extends Document {
  date: Date;
  name: string;
  email: string;
  password: string;
  type: UserType;
}

export const UserSchema = new Schema({
  date: { type: Date, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  type: { type: String },
  password: { type: String, required: true, minlength: 6 }
});

const User: Model<UserInterface> = mongoose.model<UserInterface>('User', UserSchema);

export default User;
