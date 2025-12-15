import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <Skeleton className="w-full aspect-[4/3]" />
      <div className="p-4">
        <Skeleton className="h-3 w-20 mb-2" />
        <Skeleton className="h-5 w-full mb-1" />
        <Skeleton className="h-5 w-3/4 mb-3" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    </div>
  );
}
