import mongoose, { Schema, Document } from "mongoose";

export interface IHomeWallpaper extends Document {
  title: string;
  image: string;
  route: string;
  order: number;
  gridSpan?: {
    cols: number;
    rows: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const HomeWallpaperSchema = new Schema<IHomeWallpaper>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    route: {
      type: String,
      required: [true, "Route is required"],
      trim: true,
    },
    order: {
      type: Number,
      required: true,
      default: 1,
    },
    gridSpan: {
      cols: {
        type: Number,
        default: 1,
        min: 1,
        max: 2,
      },
      rows: {
        type: Number,
        default: 1,
        min: 1,
        max: 2,
      },
    },
  },
  { timestamps: true }
);

HomeWallpaperSchema.index({ order: 1 });

export default mongoose.models.HomeWallpaper ||
  mongoose.model<IHomeWallpaper>("HomeWallpaper", HomeWallpaperSchema);
