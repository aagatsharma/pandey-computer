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
  logo?: string;
  brand: Types.ObjectId; // Reference to Brand
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
    logo: {
      type: String,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: [true, "Brand is required"],
    },
  },
  { timestamps: true }
);

SubBrandSchema.index({ slug: 1 });

export default mongoose.models.SubBrand ||
  mongoose.model<ISubBrand>("SubBrand", SubBrandSchema);
