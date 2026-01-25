"use client";

interface ProductSpecsProps {
  specs?: string[];
}

export function ProductSpecs({ specs = [] }: ProductSpecsProps) {
  return (
    <section className="w-full">
      <h2 className="text-lg font-semibold mb-4">Specifications</h2>

      <div className="grid gap-4">
        {specs.length > 0 ? (
          specs.map((spec, index) => {
            const [label, ...valueParts] = spec.split(":");
            const value = valueParts.join(":").trim();

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
          <p className="text-muted-foreground">No specifications available.</p>
        )}
      </div>
    </section>
  );
}
