"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
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
import ProductModalForm from "@/components/admin/product-modal-form";
import { IProduct } from "@/lib/models/Product";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export default function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<IProduct | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, mutate } = useSWR("/api/products", fetcher);

  const products = data?.data || [];

  const handleSubmit = async (formData: {
    id?: string;
    name: string;
    shortDescription: string;
    fullDescription: string;
    price: number;
    originalPrice?: number;
    quantity?: number;
    mainCategory?: string;
    category?: string;
    subCategory?: string;
    brand?: string;
    subBrand?: string;
    images: string[];
    isFeatured: boolean;
    specs?: Record<string, string>;
    features?: string[];
  }) => {
    try {
      const method = formData.id ? "PUT" : "POST";
      const body = formData.id ? { ...formData } : { ...formData };

      const response = await fetch("/api/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to save product");
      }

      mutate();
      setIsModalOpen(false);
      setEditData(null);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEdit = (product: IProduct) => {
    setEditData(product);
    setIsModalOpen(true);
  };

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

  const handleModalClose = (open: boolean) => {
    if (!open) {
      setEditData(null);
    }
    setIsModalOpen(open);
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
      accessorKey: "shortDescription",
      header: "Description",
      cell: ({ row }) => {
        const desc = row.getValue("shortDescription") as string;
        return <div className="max-w-md truncate">{desc}</div>;
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = row.getValue("price") as number;
        return <div>₹{price.toFixed(2)}</div>;
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
        return <div>₹{originalPrice.toFixed(2)}</div>;
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
        const category = row.getValue("category") as { name: string } | null;
        return <div>{category?.name || "-"}</div>;
      },
    },
    {
      accessorKey: "brand",
      header: "Brand",
      cell: ({ row }) => {
        const brand = row.getValue("brand") as { name: string } | null;
        return <div>{brand?.name || "-"}</div>;
      },
    },
    {
      accessorKey: "isFeatured",
      header: "Featured",
      cell: ({ row }) => {
        const isFeatured = row.getValue("isFeatured") as boolean;
        return (
          <div>
            {isFeatured ? (
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
              <DropdownMenuItem onClick={() => handleEdit(product)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setDeleteId(product._id.toString())}
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-gray-500 mt-1">Manage your products</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Add Product</Button>
      </div>

      <DataTable columns={columns} data={products} />

      <ProductModalForm
        open={isModalOpen}
        onOpenChange={handleModalClose}
        onSubmit={handleSubmit}
        editData={editData}
      />

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
