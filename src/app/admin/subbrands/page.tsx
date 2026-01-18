"use client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus, Pencil, Trash2 } from "lucide-react";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import SubBrandModalForm from "@/components/admin/subbrand-modal-form";
import { ISubBrand } from "@/lib/models/SubBrand";
import { fetcher } from "@/lib/fetcher";
import Image from "next/image";
import { IBrand } from "@/lib/models/Brand";
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
import { RingLoader } from "react-spinners"
import Loader from "@/components/loader";

export default function SubBrandsPage() {
  const { data, error, isLoading } = useSWR("/api/subbrands", fetcher);
  const subbrands = data?.data || [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<ISubBrand | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleSubmit = async (formData: {
    id?: string;
    name: string;
    brand_slug: string;
  }) => {
    const method = formData.id ? "PUT" : "POST";
    const response = await fetch("/api/subbrands", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok)
      throw new Error(
        `Failed to ${formData.id ? "update" : "create"} subbrand`
      );
    mutate("/api/subbrands");
  };

  const handleEdit = (subbrand: ISubBrand) => {
    setEditData(subbrand);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const response = await fetch(`/api/subbrands?id=${deleteId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete subbrand");
    mutate("/api/subbrands");
    setDeleteId(null);
  };

  const handleModalClose = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setEditData(null);
    }
  };

  const columns: ColumnDef<ISubBrand>[] = [
    {
      accessorKey: "brand",
      cell: ({ row }) => {
        const brand = row.getValue("brand") as IBrand;
        return (
          <div className="flex items-center space-x-2">
            {brand.logo ? (
              <Image
                src={brand.logo}
                alt={brand.name}
                height={60}
                width={60}
                className="w-8 h-8 rounded object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                No logo
              </div>
            )}
            <span>{brand.name}</span>
          </div>
        );
      },
      header: "Brand",
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
        const subbrand = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(subbrand)}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setDeleteId(subbrand._id.toString())}
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
    return <div className="text-center py-12 text-red-500">Error loading sub brands</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Sub Brands</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your sub brands</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Sub Brand
        </Button>
      </div>

      <SubBrandModalForm
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
              brand.
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

      <DataTable columns={columns} data={subbrands} />

    </div>
  );
}
