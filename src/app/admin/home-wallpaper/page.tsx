"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2, Plus, Upload } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { imageToBase64 } from "@/lib/image-base64";
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
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loader from "@/components/loader";

interface IHomeWallpaper {
  _id: string;
  title: string;
  image: string;
  route: string;
  order: number;
  gridSpan?: {
    cols: number;
    rows: number;
  };
  createdAt: string;
  updatedAt: string;
}

export default function HomeWallpaperPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<IHomeWallpaper | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [imageInputType, setImageInputType] = useState<"url" | "upload">("url");
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    route: "",
    order: 1,
    gridSpan: { cols: 1, rows: 1 },
  });

  const { data, mutate, isLoading, error } = useSWR(
    "/api/home-wallpaper",
    fetcher,
  );

  const wallpapers = data?.data || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editData ? "/api/home-wallpaper" : "/api/home-wallpaper";
      const method = editData ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          editData ? { ...formData, id: editData._id } : formData,
        ),
      });

      if (!response.ok) {
        throw new Error("Failed to save wallpaper");
      }

      mutate();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving wallpaper:", error);
      alert("Failed to save wallpaper");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const response = await fetch(`/api/home-wallpaper?id=${deleteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete wallpaper");
      }

      mutate();
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting wallpaper:", error);
      alert("Failed to delete wallpaper");
    }
  };

  const handleEdit = (wallpaper: IHomeWallpaper) => {
    setEditData(wallpaper);
    setFormData({
      title: wallpaper.title,
      image: wallpaper.image,
      route: wallpaper.route,
      order: wallpaper.order,
      gridSpan: wallpaper.gridSpan || { cols: 1, rows: 1 },
    });
    setImageInputType(wallpaper.image.startsWith("data:") ? "upload" : "url");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditData(null);
    setImageInputType("url");
    setIsUploading(false);
    setFormData({
      title: "",
      image: "",
      route: "",
      order: 1,
      gridSpan: { cols: 1, rows: 1 },
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    try {
      setIsUploading(true);
      const base64 = await imageToBase64(file);
      setFormData({ ...formData, image: base64 });
    } catch (error) {
      console.error("Error converting image:", error);
      alert("Failed to process image");
    } finally {
      setIsUploading(false);
    }
  };

  const columns: ColumnDef<IHomeWallpaper>[] = [
    {
      accessorKey: "order",
      header: "Order",
      cell: ({ row }) => <span>{row.original.order}</span>,
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <div className="relative w-20 h-20">
          <Image
            src={row.original.image}
            alt={row.original.title}
            fill
            className="object-cover rounded"
          />
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "route",
      header: "Route",
    },
    {
      accessorKey: "gridSpan",
      header: "Grid Size",
      cell: ({ row }) => (
        <span>
          {row.original.gridSpan?.cols || 1} ×{" "}
          {row.original.gridSpan?.rows || 1}
        </span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(row.original)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDeleteId(row.original._id)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        Error loading wallpapers
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Home Wallpapers
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage hero section images and links
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Wallpaper
        </Button>
      </div>

      <DataTable columns={columns} data={wallpapers} />

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editData ? "Edit Wallpaper" : "Add Wallpaper"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label>Image</Label>
              <div className="flex gap-2 mb-2">
                <Button
                  type="button"
                  variant={imageInputType === "url" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setImageInputType("url");
                    setFormData({ ...formData, image: "" });
                  }}
                >
                  URL
                </Button>
                <Button
                  type="button"
                  variant={imageInputType === "upload" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setImageInputType("upload");
                    setFormData({ ...formData, image: "" });
                  }}
                >
                  <Upload className="w-4 h-4 mr-1" />
                  Upload
                </Button>
              </div>

              {imageInputType === "url" ? (
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                  required
                />
              ) : (
                <div>
                  <Input
                    id="imageFile"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    required={!formData.image}
                  />
                  {isUploading && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Converting image...
                    </p>
                  )}
                </div>
              )}

              {formData.image && (
                <div className="relative w-full h-40 mt-2 rounded overflow-hidden border">
                  <Image
                    src={formData.image}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="route">Route</Label>
              <Input
                id="route"
                value={formData.route}
                onChange={(e) =>
                  setFormData({ ...formData, route: e.target.value })
                }
                placeholder="/shop"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cols">Grid Columns (1-4)</Label>
                <Input
                  id="cols"
                  type="number"
                  min="1"
                  max="4"
                  value={formData.gridSpan.cols}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gridSpan: {
                        ...formData.gridSpan,
                        cols: parseInt(e.target.value),
                      },
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="rows">Grid Rows (1-2)</Label>
                <Input
                  id="rows"
                  type="number"
                  min="1"
                  max="2"
                  value={formData.gridSpan.rows}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gridSpan: {
                        ...formData.gridSpan,
                        rows: parseInt(e.target.value),
                      },
                    })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({ ...formData, order: parseInt(e.target.value) })
                }
                required
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button type="submit">{editData ? "Update" : "Create"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              wallpaper.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
