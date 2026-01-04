import mongoose, { Schema, Document } from "mongoose";
import { ISuperCategory } from "./SuperCategory";

export interface ICategory extends Document {
  name: string;
  slug: string;
  logo?: string;
  superCategory?: ISuperCategory;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    logo: {
      type: String,
    },
    superCategory: {
      type: Schema.Types.ObjectId,
      ref: "SuperCategory",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
