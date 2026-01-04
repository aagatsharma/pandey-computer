import mongoose, { Schema, Document } from "mongoose";

export interface ISuperCategory extends Document {
  name: string;
  slug: string;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SuperCategorySchema = new Schema<ISuperCategory>(
  {
    name: {
      type: String,
      required: [true, "Super category name is required"],
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
  },
  { timestamps: true }
);

SuperCategorySchema.index({ slug: 1 });

export default mongoose.models.SuperCategory ||
  mongoose.model<ISuperCategory>("SuperCategory", SuperCategorySchema);
