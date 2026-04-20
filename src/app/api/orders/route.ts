import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Order from "@/lib/models/Order";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { customerDetails, orderItems, totalAmount } = body;

    // Basic validation
    if (!customerDetails || !orderItems || !totalAmount) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    if (
      !customerDetails.fullName ||
      !customerDetails.email ||
      !customerDetails.phone ||
      !customerDetails.province ||
      !customerDetails.district ||
      !customerDetails.street
    ) {
      return NextResponse.json(
        { success: false, message: "Missing customer details" },
        { status: 400 },
      );
    }

    const order = await Order.create({
      customerDetails,
      orderItems,
      totalAmount,
    });

    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create order" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const name = searchParams.get("name");
    const province = searchParams.get("province");
    const district = searchParams.get("district");

    const safePage = Number.isFinite(page) && page > 0 ? page : 1;
    const safeLimit =
      Number.isFinite(limit) && limit > 0 ? Math.min(limit, 100) : 10;

    const query: Record<string, unknown> = {};

    if (status && status !== "all") {
      query.status = status;
    }

    if (name) {
      query["customerDetails.fullName"] = { $regex: name, $options: "i" };
    }

    if (province && province !== "all") {
      query["customerDetails.province"] = province;
    }

    if (district && district !== "all") {
      query.$or = [
        { "customerDetails.district": district },
        { "customerDetails.city": district },
      ];
    }

    const totalOrders = await Order.countDocuments(query);

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip((safePage - 1) * safeLimit)
      .limit(safeLimit);

    const totalPages = Math.max(1, Math.ceil(totalOrders / safeLimit));

    return NextResponse.json({
      success: true,
      data: orders,
      pagination: {
        page: safePage,
        limit: safeLimit,
        totalOrders,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update order" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing order id" },
        { status: 400 },
      );
    }

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, message: "Order deleted" });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete order" },
      { status: 500 },
    );
  }
}
