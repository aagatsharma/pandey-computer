import mongoose, { Schema, Document } from "mongoose";

/**
 * Main Category Model (Level 1)
 *
 * Examples: "Laptops", "Accessories", "Office Components"
 */

export interface IMainCategory extends Document {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const MainCategorySchema = new Schema<IMainCategory>(
  {
    name: {
      type: String,
      required: [true, "Main category name is required"],
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
    description: {
      type: String,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    image: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

MainCategorySchema.index({ slug: 1 });
MainCategorySchema.index({ isActive: 1, order: 1 });

export default mongoose.models.MainCategory ||
  mongoose.model<IMainCategory>("MainCategory", MainCategorySchema);
