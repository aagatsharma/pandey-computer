"use client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import CategoryModalForm from "@/components/admin/category-modal-form";
import { fetcher } from "@/lib/fetcher";
import Loader from "@/components/loader";
import { ICategory } from "@/lib/models/Category";
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

export default function CategoriesPage() {
  const { data, error, isLoading } = useSWR("/api/categories", fetcher);
  const categories = data?.data || [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<ICategory | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleSubmit = async (formData: {
    id?: string;
    name: string;
    logo: string;
  }) => {
    const method = formData.id ? "PUT" : "POST";
    const response = await fetch("/api/categories", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok)
      throw new Error(
        `Failed to ${formData.id ? "update" : "create"} category`
      );
    mutate("/api/categories");
  };

  const handleEdit = (category: ICategory) => {
    setEditData(category);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const response = await fetch(`/api/categories?id=${deleteId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete category");
    mutate("/api/categories");
    setDeleteId(null);
  };

  const handleModalClose = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setEditData(null);
    }
  };

  const columns: ColumnDef<ICategory>[] = [
    {
      accessorKey: "logo",
      header: "Logo",
      cell: ({ row }) => {
        const logo = row.getValue("logo") as string;
        return logo ? (
          <Image
            src={logo}
            alt={row.getValue("name")}
            width={40}
            height={40}
            className="rounded object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
            No logo
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "slug",
      header: "Slug",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return date.toLocaleDateString();
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const category = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(category)}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setDeleteId(category._id.toString())}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error loading categories</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your categories</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      <CategoryModalForm
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
              category.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


      <DataTable columns={columns} data={categories} />

    </div>
  );
}
