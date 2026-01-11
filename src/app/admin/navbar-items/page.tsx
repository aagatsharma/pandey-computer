"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
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
import { INavbarItem } from "@/lib/models/NavbarItem";
import { NavbarItemModalForm } from "@/components/admin/navbar-item-modal-form";
import { Badge } from "@/components/ui/badge";

type NavbarItemWithChildren = INavbarItem & {
  children?: NavbarItemWithChildren[];
};

export default function NavbarItemsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<INavbarItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Fetch nested hierarchy from API
  const { data, mutate } = useSWR("/api/navbar-items?nested=true", fetcher);
  const hierarchyData = useMemo<NavbarItemWithChildren[]>(
    () => data?.data || [],
    [data]
  );

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleEdit = (item: INavbarItem) => {
    setEditData(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditData(null);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/navbar-items/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        mutate();
        setDeleteId(null);
      } else {
        const error = await response.json();
        console.error("Error deleting navbar item:", error);
        alert(error.error || "Failed to delete navbar item");
      }
    } catch (error) {
      console.error("Error deleting navbar item:", error);
      alert("Failed to delete navbar item");
    }
  };

  const handleSubmit = async (data: {
    id?: string;
    type: string;
    referenceId: string;
    parent?: string;
    order: number;
    level: number;
  }) => {
    try {
      const url = data.id
        ? `/api/navbar-items/${data.id}`
        : "/api/navbar-items";
      const method = data.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        mutate();
        handleModalClose();
      } else {
        const error = await response.json();
        console.error("Error saving navbar item:", error);
        alert(error.error || "Failed to save navbar item");
      }
    } catch (error) {
      console.error("Error saving navbar item:", error);
      alert("Failed to save navbar item");
      throw error;
    }
  };

  const getTypeBadge = (type: string) => {
    const colorMap: Record<string, string> = {
      category: "bg-blue-100 text-blue-800",
      brand: "bg-green-100 text-green-800",
      subCategory: "bg-yellow-100 text-yellow-800",
      subBrand: "bg-orange-100 text-orange-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          colorMap[type] || "bg-gray-100 text-gray-800"
        }`}
      >
        {type}
      </span>
    );
  };

  const renderItem = (item: NavbarItemWithChildren, depth: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item._id.toString());
    // Use inline style for dynamic indentation
    const indentStyle = { marginLeft: `${depth * 2}rem` };

    return (
      <div key={item._id.toString()}>
        <div
          className="flex items-center gap-3 py-3 px-4 border-b hover:bg-gray-50"
          style={indentStyle}
        >
          {hasChildren ? (
            <button
              onClick={() => toggleExpand(item._id.toString())}
              className="p-1 hover:bg-gray-200 rounded"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          ) : (
            <div className="w-6" />
          )}

          <div className="flex-1 flex items-center gap-3">
            <Badge
              variant={
                item.level === 1
                  ? "default"
                  : item.level === 2
                  ? "secondary"
                  : "outline"
              }
            >
              L{item.level}
            </Badge>
            <span className="font-medium">{item.label}</span>
            {getTypeBadge(item.type)}
            <span className="text-sm text-gray-500">{item.slug}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Order: {item.order}</span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleEdit(item)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setDeleteId(item._id.toString())}
                  className="text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div>
            {item.children!.map((child) => renderItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Navbar Items</h1>
          <p className="text-gray-500 mt-1">
            Manage 3-level navigation hierarchy
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Add Navbar Item</Button>
      </div>

      <div className="border rounded-lg bg-white">
        {hierarchyData.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No navbar items found. Click &quot;Add Navbar Item&quot; to create
            one.
          </div>
        ) : (
          <div>
            {hierarchyData.map((item: NavbarItemWithChildren) =>
              renderItem(item, 0)
            )}
          </div>
        )}
      </div>

      <NavbarItemModalForm
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
              navbar item and all its children (if any).
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
