import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrder extends Document {
  customerDetails: {
    fullName: string;
    email: string;
    phone: string;
    province: string;
    district: string;
    street: string;
    address?: string;
    city?: string;
  };
  orderItems: {
    productId: string;
    name: string;
    slug: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    customerDetails: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      province: { type: String, required: true },
      district: { type: String, required: true },
      street: { type: String, required: true },
      address: { type: String },
      city: { type: String },
    },
    orderItems: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        slug: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

if (mongoose.models.Order) {
  delete mongoose.models.Order;
}

const Order: Model<IOrder> = mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
