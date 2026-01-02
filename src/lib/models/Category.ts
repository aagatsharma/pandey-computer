import mongoose, { Schema, Document, Types } from "mongoose";

/**
 * Category Model (Level 2)
 *
 * Examples: "Computer Accessories", "Storage Device", "Audio Devices"
 * Parent: MainCategory
 */

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  mainCategory: Types.ObjectId; // Reference to MainCategory
  isActive: boolean;
  order: number;
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
    description: {
      type: String,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    image: {
      type: String,
    },
    mainCategory: {
      type: Schema.Types.ObjectId,
      ref: "MainCategory",
      required: [true, "Main category is required"],
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

CategorySchema.index({ slug: 1 });
CategorySchema.index({ mainCategory: 1, isActive: 1, order: 1 });

export default mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
