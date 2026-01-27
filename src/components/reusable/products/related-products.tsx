import Link from "next/link";
import { ProductCard } from "./product-card";
import { IProduct } from "@/lib/models/Product";

interface RelatedProductsProps {
  products: IProduct[];
  currentProductId: string;
}

export function RelatedProducts({
  products,
  currentProductId,
}: RelatedProductsProps) {
  const relatedProducts = products.filter(
    (p) => p._id.toString() !== currentProductId,
  );

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 border-t border-border">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold">Similar Products</h2>
        <Link
          href="/shop"
          className="text-primary hover:underline text-sm font-semibold"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.slice(0, 4).map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
