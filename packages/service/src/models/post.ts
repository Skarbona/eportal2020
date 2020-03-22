import mongoose, { Document, Schema, Model } from 'mongoose';

export enum PostStatus {
  Publish = 'publish',
}

export interface PostBasicInterface {
  content: {
    title: string;
    content: string;
  };
  author: typeof Schema.Types.ObjectId;
  categories: typeof Schema.Types.ObjectId[];
  image?: string;
}

export interface PostResponseInterface extends PostBasicInterface {
  date: Date;
  slug: string;
  status: PostStatus;
}

export interface PostDocumentInterface extends PostBasicInterface, Document {
  date: Date;
  slug: string;
  status: PostStatus;
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
