import mongoose, { Document, Schema, Model } from 'mongoose';
import { PostBasicInterface, PostStatus } from './shared-interfaces/post';

export interface PostDocumentInterface extends PostBasicInterface, Document {
  date: Date;
  slug: string;
  categories: typeof Schema.Types.ObjectId[];
  status: PostStatus;
  author: typeof Schema.Types.ObjectId;
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
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
  image: { type: String },
});

const Post: Model<PostDocumentInterface> = mongoose.model<PostDocumentInterface>(
  'Post',
  PostSchema,
);

export default Post;
