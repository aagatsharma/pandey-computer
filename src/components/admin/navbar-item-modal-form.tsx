"use client";

import { Loader2 } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { INavbarItem } from "@/lib/models/NavbarItem";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const formSchema = z
  .object({
    type: z.enum(["category", "brand", "subCategory", "subBrand"]),
    referenceId: z.string().min(1, "Reference is required"),
    parent: z.string().optional().or(z.literal(undefined)),
    order: z.number().min(0, "Order must be positive"),
    level: z.number().min(1).max(3),
  })
  .refine(
    (data) => {
      // Level 2 and 3 must have a parent
      if ((data.level === 2 || data.level === 3) && !data.parent) {
        return false;
      }
      return true;
    },
    {
      message: "Parent is required for Level 2 and Level 3",
      path: ["parent"],
    }
  );

type FormValues = z.infer<typeof formSchema>;

interface NavbarItemModalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    id?: string;
    type: string;
    referenceId: string;
    parent?: string;
    order: number;
    level: number;
  }) => Promise<void>;
  editData?: INavbarItem | null;
}

export function NavbarItemModalForm({
  open,
  onOpenChange,
  onSubmit,
  editData,
}: NavbarItemModalFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedParentItem, setSelectedParentItem] =
    useState<INavbarItem | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "category",
      referenceId: "",
      parent: undefined,
      order: 0,
      level: 1,
    },
  });

  const watchedType = form.watch("type");
  const watchedLevel = form.watch("level");
  const watchedParent = form.watch("parent");

  // Fetch reference options based on type
  const { data: categoriesData } = useSWR("/api/categories", fetcher);
  const { data: brandsData } = useSWR("/api/brands", fetcher);
  const { data: subCategoriesData } = useSWR("/api/subcategories", fetcher);
  const { data: subBrandsData } = useSWR("/api/subbrands", fetcher);

  // Fetch parent options (navbar items of lower level)
  const { data: parentItemsData } = useSWR(
    watchedLevel > 1 ? `/api/navbar-items?level=${watchedLevel - 1}` : null,
    fetcher
  );

  const categories = categoriesData?.data || [];
  const brands = brandsData?.data || [];
  const subCategories = subCategoriesData?.data || [];
  const subBrands = subBrandsData?.data || [];
  const parentItems = useMemo(
    () => parentItemsData?.data || [],
    [parentItemsData]
  );

  // Update selected parent item when parent changes
  useEffect(() => {
    if (watchedParent && parentItems.length > 0) {
      const parent = parentItems.find(
        (item: INavbarItem) => item._id.toString() === watchedParent
      );
      setSelectedParentItem(parent || null);
    } else {
      setSelectedParentItem(null);
    }
  }, [watchedParent, parentItems]);

  // Get available type options based on level and parent
  const getTypeOptions = () => {
    // Level 1 and 2: Only category or brand
    if (watchedLevel === 1 || watchedLevel === 2) {
      return [
        { value: "category", label: "Category" },
        { value: "brand", label: "Brand" },
      ];
    }

    // Level 3: Only subCategory or subBrand
    if (watchedLevel === 3) {
      if (selectedParentItem) {
        // If parent is category, suggest subCategory
        if (selectedParentItem.type === "category") {
          return [
            { value: "subCategory", label: "Sub Category (Recommended)" },
            { value: "subBrand", label: "Sub Brand" },
          ];
        }

        // If parent is brand, suggest subBrand
        if (selectedParentItem.type === "brand") {
          return [
            { value: "subCategory", label: "Sub Category" },
            { value: "subBrand", label: "Sub Brand (Recommended)" },
          ];
        }
      }

      // Default Level 3: subCategory and subBrand
      return [
        { value: "subCategory", label: "Sub Category" },
        { value: "subBrand", label: "Sub Brand" },
      ];
    }

    // Default: all types
    return [
      { value: "category", label: "Category" },
      { value: "brand", label: "Brand" },
      { value: "subCategory", label: "Sub Category" },
      { value: "subBrand", label: "Sub Brand" },
    ];
  };

  const getReferenceOptions = () => {
    // Filter based on parent's reference for subCategory/subBrand
    if (
      selectedParentItem &&
      (watchedType === "subCategory" || watchedType === "subBrand")
    ) {
      if (
        watchedType === "subCategory" &&
        selectedParentItem.type === "category"
      ) {
        // Show subcategories that belong to the parent category
        return subCategories.filter(
          (sub: { category: { _id?: string; toString?: () => string } }) => {
            const categoryId =
              sub.category?._id?.toString() ||
              (typeof sub.category?.toString === "function"
                ? sub.category.toString()
                : "");
            return categoryId === selectedParentItem.referenceId.toString();
          }
        );
      }

      if (watchedType === "subBrand" && selectedParentItem.type === "brand") {
        // Show subbrands that belong to the parent brand
        return subBrands.filter(
          (sub: { brand: { _id?: string; toString?: () => string } }) => {
            const brandId =
              sub.brand?._id?.toString() ||
              (typeof sub.brand?.toString === "function"
                ? sub.brand.toString()
                : "");
            return brandId === selectedParentItem.referenceId.toString();
          }
        );
      }
    }

    // Default: show all options for the type
    switch (watchedType) {
      case "category":
        return categories;
      case "brand":
        return brands;
      case "subCategory":
        return subCategories;
      case "subBrand":
        return subBrands;
      default:
        return [];
    }
  };

  useEffect(() => {
    if (editData) {
      form.reset({
        type: editData.type,
        referenceId: editData.referenceId.toString(),
        parent: editData.parent?.toString() || undefined,
        order: editData.order,
        level: editData.level,
      });
    } else {
      form.reset({
        type: "category",
        referenceId: "",
        parent: undefined,
        order: 0,
        level: 1,
      });
    }
  }, [editData, form]);

  // Reset type when level changes if current type is not valid for new level
  useEffect(() => {
    if (watchedLevel === 1 || watchedLevel === 2) {
      // Level 1 and 2: only allow category or brand
      if (watchedType !== "category" && watchedType !== "brand") {
        form.setValue("type", "category");
        form.setValue("referenceId", "");
      }
      // Clear parent for Level 1
      if (watchedLevel === 1) {
        form.setValue("parent", undefined);
      }
    } else if (watchedLevel === 3) {
      // Level 3: only allow subCategory or subBrand
      if (watchedType !== "subCategory" && watchedType !== "subBrand") {
        // Auto-select based on parent if available
        if (selectedParentItem?.type === "category") {
          form.setValue("type", "subCategory");
        } else if (selectedParentItem?.type === "brand") {
          form.setValue("type", "subBrand");
        } else {
          form.setValue("type", "subCategory");
        }
        form.setValue("referenceId", "");
      }
    }
  }, [watchedLevel, watchedType, selectedParentItem, form]);

  // Auto-set type based on parent for Level 3
  useEffect(() => {
    if (watchedLevel === 3 && selectedParentItem && !editData) {
      // Auto-select type based on parent
      if (
        selectedParentItem.type === "category" &&
        watchedType !== "subCategory"
      ) {
        form.setValue("type", "subCategory");
        form.setValue("referenceId", "");
      } else if (
        selectedParentItem.type === "brand" &&
        watchedType !== "subBrand"
      ) {
        form.setValue("type", "subBrand");
        form.setValue("referenceId", "");
      }
    }
  }, [watchedLevel, selectedParentItem, watchedType, form, editData]);

  // Reset referenceId when parent changes (for subCategory/subBrand)
  useEffect(() => {
    if (
      !editData &&
      (watchedType === "subCategory" || watchedType === "subBrand")
    ) {
      form.setValue("referenceId", "");
    }
  }, [watchedParent, watchedType, form, editData]);

  const handleSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);

      await onSubmit({
        id: editData?._id?.toString(),
        type: data.type,
        referenceId: data.referenceId,
        parent: data.parent || undefined,
        order: data.order,
        level: data.level,
      });

      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving navbar item:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {editData ? "Edit Navbar Item" : "Add Navbar Item"}
          </DialogTitle>
          <DialogDescription>
            {editData
              ? "Update navbar item details"
              : "Create a new navbar item"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Level 1</SelectItem>
                      <SelectItem value="2">Level 2</SelectItem>
                      <SelectItem value="3">Level 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!!editData}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {getTypeOptions().map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchedLevel > 1 && (
              <FormField
                control={form.control}
                name="parent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent (Required)</FormLabel>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value || undefined)
                      }
                      value={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select parent" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {parentItems.map((item: INavbarItem) => (
                          <SelectItem
                            key={item._id.toString()}
                            value={item._id.toString()}
                          >
                            {item.label} (L{item.level} - {item.type})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="referenceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reference</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={
                      !!editData || (watchedLevel === 3 && !selectedParentItem)
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reference" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {getReferenceOptions().map(
                        (item: { _id: string; name: string }) => (
                          <SelectItem key={item._id} value={item._id}>
                            {item.name}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseInt(e.target.value) : 0
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {editData ? "Updating..." : "Creating..."}
                  </>
                ) : editData ? (
                  "Update"
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
