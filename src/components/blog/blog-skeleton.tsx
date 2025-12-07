export function BlogSkeleton() {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-muted"></div>
      <div className="p-6">
        <div className="w-32 h-4 bg-muted rounded mb-3"></div>
        <div className="w-full h-6 bg-muted rounded mb-3"></div>
        <div className="w-full h-4 bg-muted rounded mb-2"></div>
        <div className="w-3/4 h-4 bg-muted rounded mb-4"></div>
        <div className="w-24 h-4 bg-muted rounded"></div>
      </div>
    </div>
  );
}
