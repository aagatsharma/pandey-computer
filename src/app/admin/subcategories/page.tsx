"use client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from "lucide-react";
import Image from "next/image";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import AdminModalForm from "@/components/admin/admin-modal-form";

type SubCategory = {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
  createdAt: string;
  updatedAt: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const columns: ColumnDef<SubCategory>[] = [
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
    cell: () => {
      return (
        <Button variant="ghost" size="icon-sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      );
    },
  },
];

export default function SubCategoriesPage() {
  const { data, error, isLoading } = useSWR("/api/subcategories", fetcher);
  const subcategories = data?.data || [];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (formData: { name: string; logo: string }) => {
    const response = await fetch("/api/subcategories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Failed to create subcategory");
    mutate("/api/subcategories");
  };

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

      <AdminModalForm
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Add Sub Category"
        description="Create a new sub category"
        fieldLabel="Sub Category Name"
        fieldPlaceholder="Enter sub category name"
        onSubmit={handleSubmit}
      />

      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">
          Error loading sub categories
        </div>
      ) : (
        <DataTable columns={columns} data={subcategories} />
      )}
    </div>
  );
}
