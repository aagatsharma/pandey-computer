"use client";

import { useEffect, useRef, useState } from "react";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Download,
  Upload,
  FileDown,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { fetcher, deleteRequest } from "@/lib/fetcher";
import axios from "axios";
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
import { toast } from "sonner";

export default function ProductsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isDownloadingSample, setIsDownloadingSample] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: brandsData } = useSWR<{ data: IBrand[] }>(
    "/api/brands",
    fetcher,
  );
  const { data: categoriesData } = useSWR<{ data: ICategory[] }>(
    "/api/categories",
    fetcher,
  );

  const [page, setPage] = useState(() => {
    const pageParam = Number(searchParams.get("page"));
    return Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
  });
  const limit = 10;

  // filters
  const [filters, setFilters] = useState(() => ({
    name: searchParams.get("name") ?? "",
    category: searchParams.get("category") ?? "",
    brand: searchParams.get("brand") ?? "",
  }));

  useEffect(() => {
    const nextFilters = {
      name: searchParams.get("name") ?? "",
      category: searchParams.get("category") ?? "",
      brand: searchParams.get("brand") ?? "",
    };

    setFilters((prev) =>
      prev.name === nextFilters.name &&
      prev.category === nextFilters.category &&
      prev.brand === nextFilters.brand
        ? prev
        : nextFilters,
    );

    const nextPageParam = Number(searchParams.get("page"));
    const nextPage =
      Number.isFinite(nextPageParam) && nextPageParam > 0 ? nextPageParam : 1;
    setPage((prev) => (prev === nextPage ? prev : nextPage));
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (filters.name) {
      params.set("name", filters.name);
    } else {
      params.delete("name");
    }

    if (filters.category) {
      params.set("category", filters.category);
    } else {
      params.delete("category");
    }

    if (filters.brand) {
      params.set("brand", filters.brand);
    } else {
      params.delete("brand");
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
  }, [filters, page, pathname, router, searchParams]);

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
      mutate(
        (
          current:
            | { data: IProduct[]; pagination: typeof pagination }
            | undefined,
        ) => ({
          ...current,
          data: (current?.data ?? []).filter((p) => p._id.toString() !== id),
        }),
        false,
      );
      setDeleteId(null);
      await deleteRequest(`/api/products?id=${id}`);
      toast.success("Product deleted successfully");
      mutate();
    } catch (error) {
      console.error("Error deleting product:", error);
      mutate();
      toast.error("Failed to delete product");
    }
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);

      // Build query with current filters (export all matching records)
      const exportQuery = new URLSearchParams({
        ...(debouncedFilters.name && { name: debouncedFilters.name }),
        ...(debouncedFilters.category && {
          category: debouncedFilters.category,
        }),
        ...(debouncedFilters.brand && { brand: debouncedFilters.brand }),
      }).toString();

      const response = await axios.get(`/api/products/csv?${exportQuery}`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `products-all-${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("Exported all matching products to CSV");
    } catch (error) {
      console.error("Error exporting products:", error);
      toast.error("Failed to export products");
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsImporting(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/products/csv", formData);
      const result = response.data;

      toast.success(
        `Import completed: ${result.results.success} succeeded, ${result.results.failed} failed`,
      );

      if (result.results.errors.length > 0) {
        console.error("Import errors:", result.results.errors);
      }

      mutate();
    } catch (error: unknown) {
      console.error("Error importing products:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to import products",
      );
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDownloadSample = async () => {
    try {
      setIsDownloadingSample(true);
      window.open("/sample-products.csv", "_blank");
      toast.success("Sample file downloaded");
    } catch (error) {
      console.error("Error downloading sample:", error);
      toast.error("Failed to download sample");
    } finally {
      setIsDownloadingSample(false);
    }
  };

  const columns: ColumnDef<IProduct>[] = [
    {
      accessorKey: "product",
      header: "Product",
      cell: ({ row }) => {
        const images = row.original.images as string[] | undefined;
        const name = row.original.name as string;

        return (
          <div className="flex gap-2 max-w-[600px]">
            {images && images.length > 0 && (
              <div className="relative w-12 h-12 shrink-0 rounded overflow-hidden">
                <Image
                  src={images[0]}
                  alt={row.original.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <span>{name}</span>
          </div>
        );
      },
    },

    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = row.getValue("price") as number;
        const originalPrice = row.original.originalPrice as number | undefined;
        return (
          <div className="flex flex-col gap-2">
            Rs. {price.toFixed(2)}
            {originalPrice && (
              <p className="block">
                Rs.
                <span className="line-through">{`${originalPrice.toFixed(2)}`}</span>
              </p>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "categories",
      header: "Categories",
      cell: ({ row }) => {
        const categories = row.getValue("categories") as ICategory[] | null;
        return (
          <div>
            {categories && categories.length > 0
              ? categories.map((c) => c.name).join(", ")
              : "-"}
          </div>
        );
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
                onClick={() => setDeleteId(String(product._id))}
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
        {/* Action Buttons */}
        <div className="flex w-full justify-between items-center gap-2 flex-wrap">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleExport}
              disabled={isExporting}
            >
              <Download className="mr-2 h-4 w-4" />
              {isExporting ? "Exporting..." : "Export CSV"}
            </Button>

            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isImporting}
            >
              <Upload className="mr-2 h-4 w-4" />
              {isImporting ? "Importing..." : "Import CSV"}
            </Button>

            <Button
              variant="ghost"
              onClick={handleDownloadSample}
              disabled={isDownloadingSample}
            >
              <FileDown className="mr-2 h-4 w-4" />
              {isDownloadingSample ? "Downloading..." : "Download Sample"}
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleImport}
            />
          </div>

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
              page={pagination?.page ?? 1}
              totalPages={pagination?.totalPages ?? 1}
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
