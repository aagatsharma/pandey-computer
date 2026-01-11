import mongoose, { Schema, Document } from "mongoose";

export interface INavbarItem extends Document {
  label: string;
  slug: string;
  level: 1 | 2 | 3;
  type: "category" | "brand" | "subCategory" | "subBrand";
  referenceId: mongoose.Types.ObjectId;
  parent?: mongoose.Types.ObjectId;
  children: mongoose.Types.ObjectId[] | INavbarItem[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const NavbarItemSchema = new Schema<INavbarItem>(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    level: {
      type: Number,
      required: true,
      enum: [1, 2, 3],
    },
    type: {
      type: String,
      required: true,
      enum: ["category", "brand", "subCategory", "subBrand"],
    },
    referenceId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "type",
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "NavbarItem",
      default: null,
    },
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: "NavbarItem",
      },
    ],
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const NavbarItem =
  mongoose.models.NavbarItem ||
  mongoose.model<INavbarItem>("NavbarItem", NavbarItemSchema);

export default NavbarItem;
