import mongoose, { Document, Schema, Model } from 'mongoose';
import { UserBasic } from './shared-interfaces/user';

export interface UserDocument extends UserBasic, Document {
  password: string;
}

export const UserSchema = new Schema({
  date: { type: Date, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  stripeCustomerId: { type: String },
  activePlan: { type: String },
  currentPeriodEnd: { type: Date },
  type: { type: String },
  password: { type: String, required: true, minlength: 6 },
  favouritesPosts: [{ type: Schema.Types.ObjectId }],
  gameDefaults: {
    onlyFavourites: { type: Boolean },
    names: {
      she: { type: String },
      he: { type: String },
    },
    place: { type: String },
    catsQuery: {
      catsInclude: [{ type: Schema.Types.ObjectId }],
      catsExclude: [{ type: Schema.Types.ObjectId }],
    },
    levels: {
      level1: { type: Number },
      level2: { type: Number },
      level3: { type: Number },
    },
    time: {
      type: { type: String },
      value: [{ type: Number }],
    },
  },
});

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', UserSchema);

export default User;
