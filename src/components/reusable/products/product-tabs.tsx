"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductTabsProps {
  description: string;
  fullDescription?: string;
  specs?: string[];
  features?: string[];
}

export function ProductTabs({
  description,
  fullDescription,
  specs = [],
  features = [],
}: ProductTabsProps) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        {features.length > 0 && (
          <TabsTrigger value="features">Features</TabsTrigger>
        )}
      </TabsList>

      <TabsContent value="description" className="space-y-4 py-6">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground">{description}</p>
          {fullDescription && (
            <div className="mt-4 text-muted-foreground whitespace-pre-line">
              {fullDescription}
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="specifications" className="py-6">
        <div className="grid gap-4">
          {specs.length > 0 ? (
            specs.map((spec, index) => {
              const [label, ...valueParts] = spec.split(":");
              const value = valueParts.join(":");
              return (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3 border-b border-border last:border-0"
                >
                  <div className="font-semibold text-foreground">{label}</div>
                  <div className="sm:col-span-2 text-muted-foreground">
                    {value || label}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-muted-foreground">
              No specifications available.
            </p>
          )}
        </div>
      </TabsContent>

      {features.length > 0 && (
        <TabsContent value="features" className="py-6">
          <div className="grid gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-1 text-primary">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-muted-foreground">{feature}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      )}
    </Tabs>
  );
}
