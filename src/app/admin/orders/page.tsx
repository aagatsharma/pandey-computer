"use client";

import { format } from "date-fns";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { fetcher, putRequest } from "@/lib/fetcher";
import { deleteRequest } from "@/lib/fetcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Check, Trash2 } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Loader from "@/components/loader";
import { Input } from "@/components/ui/input";
import { districtData } from "@/lib/district-data";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface IOrder {
  _id: string;
  customerDetails: {
    fullName: string;
    email: string;
    phone: string;
    province?: string;
    district?: string;
    street?: string;
    address?: string;
    city?: string;
  };
  totalAmount: number;
  status: string;
  createdAt: string;
  orderItems: {
    productId?: string;
    name: string;
    slug?: string;
    quantity: number;
    price: number;
  }[];
}

interface IOrderWithSearch extends IOrder {
  searchable: string;
}

function AdminOrdersPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [statusFilter, setStatusFilter] = useState<string>(
    searchParams.get("status") || "all",
  );
  const [nameFilter, setNameFilter] = useState<string>(
    searchParams.get("name") || "",
  );
  const [provinceFilter, setProvinceFilter] = useState<string>(
    searchParams.get("province") || "all",
  );
  const [districtFilter, setDistrictFilter] = useState<string>(
    searchParams.get("district") || "all",
  );
  const [deleteOrderId, setDeleteOrderId] = useState<string | null>(null);
  const [page, setPage] = useState(() => {
    const pageParam = Number(searchParams.get("page"));
    return Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
  });
  const limit = 10;

  const debouncedName = useDebounce(nameFilter, 300);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (statusFilter !== "all") {
      params.set("status", statusFilter);
    } else {
      params.delete("status");
    }

    if (nameFilter) {
      params.set("name", nameFilter);
    } else {
      params.delete("name");
    }

    if (provinceFilter !== "all") {
      params.set("province", provinceFilter);
    } else {
      params.delete("province");
    }

    if (districtFilter !== "all") {
      params.set("district", districtFilter);
    } else {
      params.delete("district");
    }

    if (page > 1) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }

    const nextQuery = params.toString();
    const currentQuery = searchParams.toString();

    if (nextQuery !== currentQuery) {
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
        scroll: false,
      });
    }
  }, [
    statusFilter,
    nameFilter,
    provinceFilter,
    districtFilter,
    page,
    pathname,
    router,
    searchParams,
  ]);

  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(statusFilter !== "all" && { status: statusFilter }),
    ...(debouncedName && { name: debouncedName }),
    ...(provinceFilter !== "all" && { province: provinceFilter }),
    ...(districtFilter !== "all" && { district: districtFilter }),
  }).toString();

  const {
    data,
    error,
    isLoading,
    mutate: revalidateOrders,
  } = useSWR(`/api/orders?${query}`, fetcher);

  const { trigger: updateOrderStatus } = useSWRMutation(
    "/api/orders",
    putRequest,
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">Error loading orders</div>
    );
  }

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await updateOrderStatus({ id, status: newStatus });
      toast.success("Order status updated");
      revalidateOrders();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleDeleteOrder = async () => {
    if (!deleteOrderId) return;

    try {
      await deleteRequest(`/api/orders?id=${deleteOrderId}`);
      toast.success("Order deleted successfully");
      setDeleteOrderId(null);

      if (orders.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
        return;
      }

      revalidateOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order");
    }
  };

  const handleClearFilters = () => {
    setNameFilter("");
    setProvinceFilter("all");
    setDistrictFilter("all");
    setStatusFilter("all");
    setPage(1);
  };

  const orders: IOrder[] = data?.data || [];
  const pagination = data?.pagination;

  const provinceOptions = districtData.map((item) => item.province);
  const districtOptions =
    provinceFilter === "all"
      ? districtData.flatMap((item) => item.districts)
      : districtData.find((item) => item.province === provinceFilter)
          ?.districts || [];

  const filteredOrders: IOrderWithSearch[] = orders.map((order) => ({
    ...order,
    searchable: `${order._id} ${order.customerDetails.fullName} ${order.customerDetails.email} ${order.customerDetails.phone} ${order.customerDetails.street || order.customerDetails.address || ""} ${order.customerDetails.district || order.customerDetails.city || ""} ${order.customerDetails.province || ""} ${order.status}`,
  }));

  const columns: ColumnDef<IOrderWithSearch>[] = [
    {
      accessorKey: "customerDetails",
      header: "Customer Details",
      cell: ({ row }) => (
        <div className="flex flex-col gap-1 text-sm">
          <span className="font-semibold">
            {row.original.customerDetails.fullName}
          </span>
          <span className="text-muted-foreground">
            {row.original.customerDetails.email}
          </span>
          <span>{row.original.customerDetails.phone}</span>
        </div>
      ),
    },
    {
      id: "street",
      header: "Street",
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.customerDetails.street ||
            row.original.customerDetails.address ||
            "-"}
        </span>
      ),
    },
    {
      id: "district",
      header: "District",
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.customerDetails.district ||
            row.original.customerDetails.city ||
            "-"}
        </span>
      ),
    },
    {
      id: "province",
      header: "Province",
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.customerDetails.province || "-"}
        </span>
      ),
    },
    {
      accessorKey: "orderItems",
      header: "Items",
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          {row.original.orderItems.map((item, index) => (
            <div key={index} className="text-sm">
              {item.slug ? (
                <a
                  href={`/product/${item.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  title="Open product in new tab"
                >
                  {item.name}
                </a>
              ) : (
                <span>{item.name}</span>
              )}{" "}
              <span className="text-muted-foreground">x{item.quantity}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) =>
        format(new Date(row.original.createdAt), "MMM d, yyyy"),
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
              <DropdownMenuItem
                onClick={() => handleStatusUpdate(order._id, "pending")}
              >
                Mark as Pending
                {order.status === "pending" && (
                  <Check className="ml-2 h-4 w-4" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusUpdate(order._id, "processing")}
              >
                Mark as Processing
                {order.status === "processing" && (
                  <Check className="ml-2 h-4 w-4" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusUpdate(order._id, "shipped")}
              >
                Mark as Shipped
                {order.status === "shipped" && (
                  <Check className="ml-2 h-4 w-4" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusUpdate(order._id, "delivered")}
              >
                Mark as Delivered
                {order.status === "delivered" && (
                  <Check className="ml-2 h-4 w-4" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusUpdate(order._id, "cancelled")}
                className="text-red-600"
              >
                Mark as Cancelled
                {order.status === "cancelled" && (
                  <Check className="ml-2 h-4 w-4" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setDeleteOrderId(order._id)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Order
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
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your orders</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Input
            value={nameFilter}
            onChange={(e) => {
              setNameFilter(e.target.value);
              setPage(1);
            }}
            placeholder="Filter by customer name"
            className="w-56"
          />

          <Select
            value={provinceFilter}
            onValueChange={(value) => {
              setProvinceFilter(value);
              setDistrictFilter("all");
              setPage(1);
            }}
          >
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Filter by Province" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Provinces</SelectItem>
              {provinceOptions.map((province) => (
                <SelectItem key={province} value={province}>
                  {province}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={districtFilter}
            onValueChange={(value) => {
              setDistrictFilter(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Filter by District" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Districts</SelectItem>
              {districtOptions.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-45">
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

          <Button
            type="button"
            variant="outline"
            onClick={handleClearFilters}
            disabled={
              !nameFilter &&
              provinceFilter === "all" &&
              districtFilter === "all" &&
              statusFilter === "all"
            }
          >
            Clear Filters
          </Button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredOrders}
        page={pagination?.page ?? 1}
        totalPages={pagination?.totalPages ?? 1}
        onPageChange={setPage}
      />

      <AlertDialog
        open={!!deleteOrderId}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteOrderId(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this order?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              selected order.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteOrder}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function AdminOrdersPage() {
  return (
    <Suspense fallback={<Loader />}>
      <AdminOrdersPageContent />
    </Suspense>
  );
}
