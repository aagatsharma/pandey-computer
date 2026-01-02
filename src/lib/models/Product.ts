import mongoose, { Schema, Document, Types } from "mongoose";

/**
 * Product Model (Minimal)
 */

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;

  // Categorization
  mainCategory?: Types.ObjectId;
  category?: Types.ObjectId;
  subCategory?: Types.ObjectId;
  brand?: Types.ObjectId;
  subBrand?: Types.ObjectId;

  // Media
  images: string[];

  // Status
  quantity: number;
  isActive: boolean;
  isFeatured: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    compareAtPrice: {
      type: Number,
      min: 0,
    },

    // Categorization
    mainCategory: {
      type: Schema.Types.ObjectId,
      ref: "MainCategory",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
    },
    subBrand: {
      type: Schema.Types.ObjectId,
      ref: "SubBrand",
    },

    // Media
    images: {
      type: [String],
      default: [],
    },

    // Status
    quantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Indexes
ProductSchema.index({ slug: 1 });
ProductSchema.index({ mainCategory: 1, category: 1, subCategory: 1 });
ProductSchema.index({ brand: 1, subBrand: 1 });
ProductSchema.index({ isActive: 1, isFeatured: 1 });

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
