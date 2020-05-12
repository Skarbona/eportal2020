import mongoose, { Document, Schema, Model } from 'mongoose';
import { PageBasicInterface } from './shared-interfaces/page';

export interface PageDocumentInterface extends PageBasicInterface, Document {
  date: Date;
  slug: string;
  author: typeof Schema.Types.ObjectId;
}

export const PageSchema = new Schema({
  date: { type: Date, required: true },
  slug: { type: String, required: true, unique: true },
  content: {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  author: { type: Schema.Types.ObjectId, required: true },
  image: { type: String },
});

const Page: Model<PageDocumentInterface> = mongoose.model<PageDocumentInterface>(
  'Page',
  PageSchema,
);

export default Page;
