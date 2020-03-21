import mongoose, { Document, Schema, Model } from 'mongoose';

interface CategoryBasicInterface {
  date: Date;
  slug: string;
  name: string;
  description?: string;
}

export interface CategoryDocumentInterface extends CategoryBasicInterface, Document {
  children?: typeof Schema.Types.ObjectId[];
}

export interface CategoryRequestInterface extends CategoryBasicInterface {
  parent?: typeof Schema.Types.ObjectId[];
}

export const CategorySchema = new Schema({
  date: { type: Date, required: true },
  slug: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  description: { type: String },
  children: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
});

const Category: Model<CategoryDocumentInterface> = mongoose.model<CategoryDocumentInterface>(
  'Category',
  CategorySchema,
);

export default Category;
