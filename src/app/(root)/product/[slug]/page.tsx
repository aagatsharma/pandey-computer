import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import { ProductImageGallery } from "@/components/reusable/products/product-image-gallery";
import { ProductSpecs } from "@/components/reusable/products/product-tabs";
import { RelatedProducts } from "@/components/reusable/products/related-products";
import { ProductActions } from "@/components/reusable/products/product-actions";
import { IProduct } from "@/lib/models/Product";
import dbConnect from "@/lib/mongoose";
import Product from "@/lib/models/Product";
import "@/lib/models/Category";
import "@/lib/models/SubCategory";
import "@/lib/models/Brand";
import "@/lib/models/SubBrand";

import { Types } from "mongoose";
import { GoDotFill } from "react-icons/go";

export const revalidate = 3600; // 1 hour caching for SEO/performance

async function getProduct(slug: string) {
  await dbConnect();

  const product = await Product.findOne({ slug })
    .populate("category", "name slug")
    .populate("subCategory", "name slug")
    .populate("brand", "name slug logo")
    .populate("subBrand", "name slug")
    .lean();

  return JSON.parse(JSON.stringify(product)) as IProduct | null;
}

async function getRelatedProducts(
  categoryId: string | Types.ObjectId,
  currentProductId: string | Types.ObjectId,
) {
  await dbConnect();

  const products = await Product.find({
    category: categoryId,
    _id: { $ne: currentProductId },
  })
    .populate("category", "name slug")
    .populate("brand", "name slug logo")
    .limit(4)
    .lean();

  return JSON.parse(JSON.stringify(products)) as IProduct[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | Pandey Computer`,
    description: product.specs ? Object.values(product.specs).join(", ") : "",
    openGraph: {
      title: product.name,
      images:
        product.images && product.images.length > 0 ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const relatedProducts = product.category
    ? await getRelatedProducts(product.category._id, product._id.toString())
    : [];

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  const specsArray = product.specs
    ? Object.entries(product.specs).map(([k, v]) => `${k}: ${v}`)
    : [];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-muted py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-foreground">
              Shop
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <section className="container mx-auto my-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="relative">
            <ProductImageGallery
              images={product.images || []}
              productName={product.name}
            />

            {discount > 0 && (
              <Badge
                variant="destructive"
                className="absolute top-4 right-4 text-sm font-bold px-3 py-1 shadow-lg text-white"
              >
                -{discount}%
              </Badge>
            )}
            {!product.stock && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                <span className="text-white font-bold text-2xl">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="text-sm text-primary font-semibold uppercase tracking-wide mb-2">
              {[
                product.category?.name,
                product.brand?.name ||
                  product.subBrand?.name ||
                  product.subCategory?.name,
              ]
                .filter(Boolean)
                .join(" > ")}
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline flex-wrap gap-4 mb-8">
              <span className="text-2xl text-primary font-medium">
                Rs.{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  Rs.{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="mb-6">
              {product.stock ? (
                <span className="text-green-600 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>In
                  Stock
                </span>
              ) : (
                <span className="text-red-600 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>Out
                  of Stock
                </span>
              )}
            </div>

            <ProductActions product={product} />

            {/* Key Features */}
            {product?.keyFeatures && product.keyFeatures?.length > 0 && (
              <div className="text-lg text-muted-foreground my-6">
                <h3 className="text-black font-semibold">Key Features</h3>
                {product?.keyFeatures?.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 mt-2">
                    <div className="mt-1 text-primary">
                      <GoDotFill className="size-5" />
                    </div>
                    <p className="text-muted-foreground">{f}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <ProductSpecs specs={specsArray} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <RelatedProducts
            products={relatedProducts}
            currentProductId={product._id.toString()}
          />
        )}
      </section>
    </div>
  );
}
