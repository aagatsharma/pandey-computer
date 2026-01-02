import mongoose, { Schema, Document, Types } from "mongoose";

/**
 * Brand Model (Level 2)
 *
 * Examples: "Dell", "Asus", "HP", "Lenovo"
 * Linked to: MainCategory (e.g., "Laptops")
 */

export interface IBrand extends Document {
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  mainCategory?: Types.ObjectId; // Reference to MainCategory (e.g., "Laptops")
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const BrandSchema = new Schema<IBrand>(
  {
    name: {
      type: String,
      required: [true, "Brand name is required"],
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
    logo: {
      type: String,
    },
    mainCategory: {
      type: Schema.Types.ObjectId,
      ref: "MainCategory",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

BrandSchema.index({ slug: 1 });
BrandSchema.index({ mainCategory: 1, isActive: 1, order: 1 });
BrandSchema.index({ isFeatured: 1, isActive: 1 });

export default mongoose.models.Brand ||
  mongoose.model<IBrand>("Brand", BrandSchema);
