import mongoose, { Schema, Document, Types } from "mongoose";

/**
 * Sub Brand Model (Level 3)
 *
 * Examples: "Inspiron", "Vostro", "Zenbook", "ROG"
 * Parent: Brand
 */

export interface ISubBrand extends Document {
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  brand: Types.ObjectId; // Reference to Brand
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SubBrandSchema = new Schema<ISubBrand>(
  {
    name: {
      type: String,
      required: [true, "Sub brand name is required"],
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
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: [true, "Brand is required"],
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

SubBrandSchema.index({ slug: 1 });
SubBrandSchema.index({ brand: 1, isActive: 1, order: 1 });

export default mongoose.models.SubBrand ||
  mongoose.model<ISubBrand>("SubBrand", SubBrandSchema);
