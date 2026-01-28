"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { IProduct } from "@/lib/models/Product";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Loader from "@/components/loader";
import { IBrand } from "@/lib/models/Brand";
import { ICategory } from "@/lib/models/Category";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductsPage() {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: brandsData } = useSWR<{ data: IBrand[] }>(
    "/api/brands",
    fetcher,
  );
  const { data: categoriesData } = useSWR<{ data: ICategory[] }>(
    "/api/categories",
    fetcher,
  );

  const [page, setPage] = useState(1);
  const limit = 10;

  // filters
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    brand: "",
  });

  const debouncedFilters = useDebounce(filters, 500);

  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(debouncedFilters.name && { name: debouncedFilters.name }),
    ...(debouncedFilters.category && { category: debouncedFilters.category }),
    ...(debouncedFilters.brand && { brand: debouncedFilters.brand }),
  }).toString();

  const { data, isLoading, error, mutate } = useSWR(
    `/api/products?${query}`,
    fetcher,
  );

  const products: IProduct[] = data?.data ?? [];
  const pagination = data?.pagination;

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      mutate();
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const columns: ColumnDef<IProduct>[] = [
    {
      accessorKey: "images",
      header: "Image",
      cell: ({ row }) => {
        const images = row.getValue("images") as string[];
        if (!images || images.length === 0) {
          return (
            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
              N/A
            </div>
          );
        }
        return (
          <div className="relative w-12 h-12 rounded overflow-hidden">
            <Image
              src={images[0]}
              alt={row.original.name}
              fill
              className="object-cover"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = row.getValue("price") as number;
        return <div>Rs. {price.toFixed(2)}</div>;
      },
    },
    {
      accessorKey: "originalPrice",
      header: "Original Price",
      cell: ({ row }) => {
        const originalPrice = row.getValue("originalPrice") as
          | number
          | undefined;
        if (!originalPrice) return <div>-</div>;
        return <div>Rs. {originalPrice.toFixed(2)}</div>;
      },
    },
    {
      accessorKey: "quantity",
      header: "Stock",
      cell: ({ row }) => {
        const quantity = row.getValue("quantity") as number;
        return (
          <div className={quantity > 0 ? "text-green-600" : "text-red-600"}>
            {quantity}
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue("category") as ICategory | null;
        return <div>{category?.name || "-"}</div>;
      },
    },
    {
      accessorKey: "brand",
      header: "Brand",
      cell: ({ row }) => {
        const brand = row.getValue("brand") as IBrand | null;
        return (
          <div className="flex flex-col gap-2 items-center">
            {brand?.logo && (
              <Image
                src={brand?.logo}
                height={60}
                width={60}
                alt={brand?.name || "Brand logo"}
              />
            )}
            {brand?.name || "-"}
          </div>
        );
      },
    },
    {
      accessorKey: "stock",
      header: "In Stock",
      cell: ({ row }) => {
        const stock = row.getValue("stock") as boolean;
        return (
          <div>
            {stock ? (
              <span className="text-green-600 font-semibold">Yes</span>
            ) : (
              <span className="text-gray-400">No</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "hotDeals",
      header: "Hot Deals",
      cell: ({ row }) => {
        const hotDeals = row.getValue("hotDeals") as boolean;
        return (
          <div>
            {hotDeals ? (
              <span className="text-green-600 font-semibold">Yes</span>
            ) : (
              <span className="text-gray-400">No</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "topSelling",
      header: "Top Selling",
      cell: ({ row }) => {
        const topSelling = row.getValue("topSelling") as boolean;
        return (
          <div>
            {topSelling ? (
              <span className="text-green-600 font-semibold">Yes</span>
            ) : (
              <span className="text-gray-400">No</span>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const product = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => router.push(`/admin/products/${product._id}`)}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setDeleteId(product.slug)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        Error loading products
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-2">
        {/* Filters */}
        <div className="flex w-full justify-end">
          <Button onClick={() => router.push("/admin/products/add")}>
            Add Product
          </Button>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          {/* Name filter */}
          <Input
            placeholder="Search name"
            className="border px-3 py-2 rounded w-96"
            value={filters.name}
            onChange={(e) => {
              setFilters((f) => ({ ...f, name: e.target.value }));
              setPage(1);
            }}
          />

          {/* Category filter */}
          <Select
            value={filters.category}
            onValueChange={(value) => {
              setFilters((f) => ({ ...f, category: value }));
              setPage(1);
            }}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categoriesData?.data?.map((cat) => (
                <SelectItem key={cat.slug} value={cat.slug}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Brand filter */}
          <Select
            value={filters.brand}
            onValueChange={(value) => {
              setFilters((f) => ({ ...f, brand: value }));
              setPage(1);
            }}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent>
              {brandsData?.data?.map((brand: IBrand) => (
                <SelectItem key={brand.slug} value={brand.slug}>
                  {brand.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Reset button */}
          <Button
            variant="ghost"
            onClick={() => {
              setFilters({ name: "", category: "", brand: "" });
              setPage(1);
            }}
          >
            Reset
          </Button>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="mt-4">
            <DataTable
              columns={columns}
              data={products}
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={setPage}
            />
          </div>
        )}

        {/* Table */}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
