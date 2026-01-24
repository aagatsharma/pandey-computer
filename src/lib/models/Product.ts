import mongoose, { Schema, Document } from "mongoose";
import { ICategory } from "./Category";
import { ISubCategory } from "./SubCategory";
import { IBrand } from "./Brand";
import { ISubBrand } from "./SubBrand";

/**
 * Product Model (Minimal)
 */

export interface IProduct extends Document {
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  specs?: Record<string, string>;
  keyFeatures?: string[];
  features?: string[];

  category?: ICategory;
  subCategory?: ISubCategory;
  brand?: IBrand;
  subBrand?: ISubBrand;

  // Media
  images: string[];

  // Status
  quantity: number;
  isFeatured: boolean;
  hotDeals?: boolean;
  topSelling?: boolean;

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
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      min: 0,
    },
    specs: {
      type: Map,
      of: String,
    },
    keyFeatures: {
      type: [String],
      default: [],
    },
    features: {
      type: [String],
      default: [],
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
    isFeatured: {
      type: Boolean,
      default: false,
    },
    hotDeals: {
      type: Boolean,
      default: false,
    },
    topSelling: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
