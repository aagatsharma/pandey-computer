import mongoose, { Schema, Document, Types } from "mongoose";

/**
 * Sub Category Model (Level 3)
 *
 * Examples: "Mouse Pad", "HDD", "SSD", "Webcam"
 * Parent: Category
 */

export interface ISubCategory extends Document {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  category: Types.ObjectId; // Reference to Category
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SubCategorySchema = new Schema<ISubCategory>(
  {
    name: {
      type: String,
      required: [true, "Sub category name is required"],
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
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
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

SubCategorySchema.index({ slug: 1 });
SubCategorySchema.index({ category: 1, isActive: 1, order: 1 });

export default mongoose.models.SubCategory ||
  mongoose.model<ISubCategory>("SubCategory", SubCategorySchema);
