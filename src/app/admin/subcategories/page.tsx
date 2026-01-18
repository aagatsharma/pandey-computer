"use client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus, Pencil, Trash2 } from "lucide-react";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import SubCategoryModalForm from "@/components/admin/subcategory-modal-form";
import { ISubCategory } from "@/lib/models/SubCategory";
import { fetcher } from "@/lib/fetcher";
import { ICategory } from "@/lib/models/Category";
import Image from "next/image";
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
import Loader from "@/components/loader";

export default function SubCategoriesPage() {
  const { data, error, isLoading } = useSWR("/api/subcategories", fetcher);
  const subcategories = data?.data || [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<ISubCategory | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleSubmit = async (formData: {
    id?: string;
    name: string;
    category_slug: string;
  }) => {
    const method = formData.id ? "PUT" : "POST";
    const response = await fetch("/api/subcategories", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok)
      throw new Error(
        `Failed to ${formData.id ? "update" : "create"} subcategory`
      );
    mutate("/api/subcategories");
  };

  const handleEdit = (subcategory: ISubCategory) => {
    setEditData(subcategory);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const response = await fetch(`/api/subcategories?id=${deleteId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete subcategory");
    mutate("/api/subcategories");
    setDeleteId(null);
  };

  const handleModalClose = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setEditData(null);
    }
  };

  const columns: ColumnDef<ISubCategory>[] = [
    {
      accessorKey: "category",
      cell: ({ row }) => {
        const category = row.getValue("category") as ICategory;
        return (
          <div className="flex items-center space-x-2">
            {category?.logo ? (
              <Image
                src={category.logo}
                alt={category.name}
                height={60}
                width={60}
                className="w-8 h-8 rounded object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                No logo
              </div>
            )}
            <span>{category?.name}</span>
          </div>
        );
      },
      header: "Category",
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
        const subcategory = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(subcategory)}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setDeleteId(subcategory._id.toString())}
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
    return <div className="text-center py-12 text-red-500">Error loading sub categories</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Sub Categories
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your sub categories
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Sub Category
        </Button>
      </div>

      <SubCategoryModalForm
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
              This action cannot be undone. This will permanently delete the sub
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


      <DataTable columns={columns} data={subcategories} />

    </div>
  );
}
