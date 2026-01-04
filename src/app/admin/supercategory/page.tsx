"use client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import AdminModalForm from "@/components/admin/admin-modal-form";
import { fetcher } from "@/lib/fetcher";
import { ISuperCategory } from "@/lib/models/SuperCategory";
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

export default function SuperCategoryPage() {
  const { data, error, isLoading } = useSWR("/api/supercategory", fetcher);
  const supercategories = data?.data || [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<ISuperCategory | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleSubmit = async (formData: {
    id?: string;
    name: string;
    logo: string;
  }) => {
    const method = formData.id ? "PUT" : "POST";
    const response = await fetch("/api/supercategory", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok)
      throw new Error(
        `Failed to ${formData.id ? "update" : "create"} supercategory`
      );
    mutate("/api/supercategory");
  };

  const handleEdit = (supercategory: ISuperCategory) => {
    setEditData(supercategory);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const response = await fetch(`/api/supercategory?id=${deleteId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete supercategory");
    mutate("/api/supercategory");
    setDeleteId(null);
  };

  const handleModalClose = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setEditData(null);
    }
  };

  const columns: ColumnDef<ISuperCategory>[] = [
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
        const supercategory = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(supercategory)}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setDeleteId(supercategory._id.toString())}
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Super Category
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your super categories
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Super Category
        </Button>
      </div>

      <AdminModalForm
        open={isModalOpen}
        onOpenChange={handleModalClose}
        title={editData ? "Edit Super Category" : "Add Super Category"}
        description={
          editData
            ? "Update super category details"
            : "Create a new super category"
        }
        fieldLabel="Super Category Name"
        fieldPlaceholder="Enter super category name"
        onSubmit={handleSubmit}
        editData={editData}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              super category.
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

      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">
          Error loading super categories
        </div>
      ) : (
        <DataTable columns={columns} data={supercategories} />
      )}
    </div>
  );
}
