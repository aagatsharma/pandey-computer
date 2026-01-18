import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrder extends Document {
    customerDetails: {
        fullName: string;
        email: string;
        phone: string;
        address: string;
        city: string;
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
            address: { type: String, required: true },
            city: { type: String, required: true },
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
    { timestamps: true }
);

const Order: Model<IOrder> =
    mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
