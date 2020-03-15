import mongoose, { Document, Schema, Model } from 'mongoose';

export enum PostStatus {
  Publish = 'publish',
}

export interface PostInterface extends Document {
  date: Date;
  slug: string;
  status: PostStatus;
  content: {
    title: string;
    content: string;
  };
  author: typeof Schema.Types.ObjectId;
  categories: number[];
  image?: string;
}

export const PostSchema = new Schema({
  date: { type: Date, required: true },
  slug: { type: String, required: true },
  status: { type: PostStatus, required: true },
  content: {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  author: { type: Schema.Types.ObjectId, required: true },
  categories: [{ type: Number, required: true }],
  image: { type: String }
});

const Post: Model<PostInterface> = mongoose.model<PostInterface>('Post', PostSchema);

export default Post;
