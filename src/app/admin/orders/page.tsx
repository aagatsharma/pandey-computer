"use client";

import { format } from "date-fns";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/lib/fetcher";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Check } from "lucide-react";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Loader from "@/components/loader";

interface IOrder {
    _id: string;
    customerDetails: {
        fullName: string;
        email: string;
        phone: string;
        address: string;
        city: string;
    };
    totalAmount: number;
    status: string;
    createdAt: string;
    orderItems: {
        name: string;
        quantity: number;
        price: number;
    }[];
}

interface IOrderWithSearch extends IOrder {
    searchable: string;
}

export default function AdminOrdersPage() {
    const { data, error, isLoading } = useSWR("/api/orders", fetcher);
    const [statusFilter, setStatusFilter] = useState<string>("all");

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <div className="text-center py-12 text-red-500">Error loading orders</div>;
    }

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            const res = await fetch("/api/orders", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            });

            if (!res.ok) throw new Error("Failed to update status");

            toast.success("Order status updated");
            mutate("/api/orders");
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status");
        }
    };

    const orders: IOrder[] = data?.data || [];

    const filteredOrders: IOrderWithSearch[] = orders
        .filter((order) => statusFilter === "all" || order.status === statusFilter)
        .map((order) => ({
            ...order,
            searchable: `${order._id} ${order.customerDetails.fullName} ${order.customerDetails.email} ${order.customerDetails.phone} ${order.customerDetails.address} ${order.customerDetails.city} ${order.status}`,
        }));

    const columns: ColumnDef<IOrderWithSearch>[] = [
        {
            accessorKey: "customerDetails",
            header: "Customer Details",
            cell: ({ row }) => (
                <div className="flex flex-col gap-1 text-sm">
                    <span className="font-semibold">{row.original.customerDetails.fullName}</span>
                    <span className="text-muted-foreground">{row.original.customerDetails.email}</span>
                    <span>{row.original.customerDetails.phone}</span>
                    <span className="text-xs text-muted-foreground">
                        {row.original.customerDetails.address}, {row.original.customerDetails.city}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "orderItems",
            header: "Items",
            cell: ({ row }) => (
                <div className="flex flex-col gap-1">
                    {row.original.orderItems.map((item, index) => (
                        <span key={index} className="text-sm">
                            {item.name} <span className="text-muted-foreground">x{item.quantity}</span>
                        </span>
                    ))}
                </div>
            ),
        },
        {
            accessorKey: "createdAt",
            header: "Date",
            cell: ({ row }) => format(new Date(row.original.createdAt), "MMM d, yyyy"),
        },
        {
            accessorKey: "totalAmount",
            header: "Total",
            cell: ({ row }) => `Rs.${row.original.totalAmount.toLocaleString()}`,
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <Badge
                    variant={
                        row.original.status === "delivered"
                            ? "default"
                            : row.original.status === "cancelled"
                                ? "destructive"
                                : "secondary"
                    }
                >
                    {row.original.status}
                </Badge>
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const order = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order._id, "pending")}>
                                Mark as Pending
                                {order.status === "pending" && <Check className="ml-2 h-4 w-4" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order._id, "processing")}>
                                Mark as Processing
                                {order.status === "processing" && <Check className="ml-2 h-4 w-4" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order._id, "shipped")}>
                                Mark as Shipped
                                {order.status === "shipped" && <Check className="ml-2 h-4 w-4" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order._id, "delivered")}>
                                Mark as Delivered
                                {order.status === "delivered" && <Check className="ml-2 h-4 w-4" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleStatusUpdate(order._id, "cancelled")}
                                className="text-red-600"
                            >
                                Mark as Cancelled
                                {order.status === "cancelled" && <Check className="ml-2 h-4 w-4" />}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
        {
            accessorKey: "searchable",
            header: "",
            cell: () => null,
            enableHiding: true,
        },
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your orders</p>
                </div>
                <div className="flex items-center gap-4">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DataTable columns={columns} data={filteredOrders} searchKey="searchable" />
        </div>
    );
}
