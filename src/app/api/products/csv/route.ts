import Product from "@/lib/models/Product";
import Category from "@/lib/models/Category";
import SubCategory from "@/lib/models/SubCategory";
import Brand from "@/lib/models/Brand";
import SubBrand from "@/lib/models/SubBrand";
import dbConnect from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

// Export products to CSV
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);

    // Query parameters for filtering and pagination
    const page = parseInt(searchParams?.get("page") || "") || 1;
    const limit = parseInt(searchParams?.get("limit") || "") || 10;

    // Filter parameters
    const name = searchParams.get("name");
    const categorySlug = searchParams.get("category");
    const brandSlug = searchParams.get("brand");

    // Build filter query
    const filter: Record<string, unknown> = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    if (categorySlug) {
      const cat = await Category.findOne({ slug: categorySlug }).select("_id");
      if (cat) filter.categories = { $in: [cat._id] };
    }

    if (brandSlug) {
      const brandDoc = await Brand.findOne({ slug: brandSlug }).select("_id");
      if (brandDoc) filter.brand = brandDoc._id;
    }

    // Calculate skip/offset for pagination
    const skip = (page - 1) * limit;

    const products = await Product.find(filter)
      .populate("categories", "name")
      .populate("subCategories", "name")
      .populate("brand", "name")
      .populate("subBrand", "name")
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Create CSV header
    const headers = [
      "name",
      "price",
      "originalPrice",
      "stock",
      "hotDeals",
      "topSelling",
      "categoryNames",
      "subCategoryNames",
      "brandName",
      "subBrandName",
      "keyFeatures",
      "specs",
      "images",
    ];

    // Create CSV rows
    const rows = products.map((product: { 
      name: string;
      price: number;
      originalPrice?: number;
      stock: boolean;
      hotDeals?: boolean;
      topSelling?: boolean;
      categories?: { name: string }[];
      subCategories?: { name: string }[];
      brand?: { name: string };
      subBrand?: { name: string };
      keyFeatures?: string[];
      specs?: Record<string, string>;
      images?: string[];
    }) => {
      const categoryNames = product.categories
        ?.map((c) => c.name)
        .join(",") || "";
      const subCategoryNames = product.subCategories
        ?.map((sc) => sc.name)
        .join(",") || "";
      const brandName = product.brand?.name || "";
      const subBrandName = product.subBrand?.name || "";
      const keyFeatures = product.keyFeatures?.join("|") || "";
      const specs = product.specs
        ? Object.entries(product.specs)
            .map(([k, v]) => `${k}:${v}`)
            .join("|")
        : "";
      const images = product.images?.join("|") || "";

      return [
        `"${product.name}"`,
        product.price,
        product.originalPrice || "",
        product.stock,
        product.hotDeals || false,
        product.topSelling || false,
        `"${categoryNames}"`,
        `"${subCategoryNames}"`,
        `"${brandName}"`,
        `"${subBrandName}"`,
        `"${keyFeatures}"`,
        `"${specs}"`,
        `"${images}"`,
      ].join(",");
    });

    const csv = [headers.join(","), ...rows].join("\n");

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="products-${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    console.error("Error exporting products:", error);
    return NextResponse.json(
      { message: "Failed to export products" },
      { status: 500 }
    );
  }
}

// Import products from CSV
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 }
      );
    }

    const text = await file.text();
    const lines = text
      .split("\n")
      .filter((line) => line.trim() && !line.trim().startsWith("#")); // Skip empty and comment lines

    if (lines.length < 2) {
      return NextResponse.json(
        { message: "CSV file is empty or invalid" },
        { status: 400 }
      );
    }

    const headers = lines[0].split(",");
    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[],
    };

    // Process each row (skip header)
    for (let i = 1; i < lines.length; i++) {
      try {
        const values = parseCSVLine(lines[i]);
        const row: Record<string, string> = {};

        headers.forEach((header, index) => {
          row[header.trim()] = values[index]?.trim() || "";
        });

        // Parse categories
        const categoryNames = row.categoryNames
          .split(",")
          .map((n: string) => n.trim())
          .filter(Boolean);
        const categories = await Promise.all(
          categoryNames.map(async (name: string) => {
            let cat = await Category.findOne({ name }).select("_id");
            if (!cat) {
              cat = await Category.create({
                name,
                slug: slugify(name, { lower: true, strict: true }),
              });
            }
            return cat._id;
          })
        );

        // Parse subcategories
        const subCategoryNames = row.subCategoryNames
          .split(",")
          .map((n: string) => n.trim())
          .filter(Boolean);
        const subCategories = await Promise.all(
          subCategoryNames.map(async (name: string) => {
            let subCat = await SubCategory.findOne({ name }).select("_id");
            if (!subCat && categories.length > 0) {
              subCat = await SubCategory.create({
                name,
                slug: slugify(name, { lower: true, strict: true }),
                category: categories[0], // Associate with first category
              });
            }
            return subCat?._id;
          })
        );

        // Parse brand
        let brandId;
        if (row.brandName) {
          let brand = await Brand.findOne({ name: row.brandName }).select(
            "_id"
          );
          if (!brand) {
            brand = await Brand.create({
              name: row.brandName,
              slug: slugify(row.brandName, { lower: true, strict: true }),
            });
          }
          brandId = brand._id;
        }

        // Parse subbrand
        let subBrandId;
        if (row.subBrandName && brandId) {
          let subBrand = await SubBrand.findOne({
            name: row.subBrandName,
          }).select("_id");
          if (!subBrand) {
            subBrand = await SubBrand.create({
              name: row.subBrandName,
              slug: slugify(row.subBrandName, { lower: true, strict: true }),
              brand: brandId,
            });
          }
          subBrandId = subBrand._id;
        }

        // Parse key features
        const keyFeatures = row.keyFeatures
          .split("|")
          .map((f: string) => f.trim())
          .filter(Boolean);

        // Parse specs
        const specs: Record<string, string> = {};
        if (row.specs) {
          row.specs.split("|").forEach((spec: string) => {
            const [key, value] = spec.split(":");
            if (key && value) {
              specs[key.trim()] = value.trim();
            }
          });
        }

        // Parse images
        const images = row.images
          .split("|")
          .map((img: string) => img.trim())
          .filter(Boolean);

        // Create product
        const slug = slugify(row.name, { lower: true, strict: true });
        
        // Check if product already exists
        const existing = await Product.findOne({ slug });
        if (existing) {
          // Update existing product
          await Product.findByIdAndUpdate(existing._id, {
            name: row.name,
            price: parseFloat(row.price),
            originalPrice: row.originalPrice
              ? parseFloat(row.originalPrice)
              : undefined,
            stock: row.stock === "true" || row.stock === "TRUE",
            hotDeals: row.hotDeals === "true" || row.hotDeals === "TRUE",
            topSelling: row.topSelling === "true" || row.topSelling === "TRUE",
            categories: categories.filter(Boolean),
            subCategories: subCategories.filter(Boolean),
            brand: brandId,
            subBrand: subBrandId,
            keyFeatures,
            specs: Object.keys(specs).length > 0 ? specs : undefined,
            images,
          });
        } else {
          // Create new product
          await Product.create({
            name: row.name,
            slug,
            price: parseFloat(row.price),
            originalPrice: row.originalPrice
              ? parseFloat(row.originalPrice)
              : undefined,
            stock: row.stock === "true" || row.stock === "TRUE",
            hotDeals: row.hotDeals === "true" || row.hotDeals === "TRUE",
            topSelling: row.topSelling === "true" || row.topSelling === "TRUE",
            categories: categories.filter(Boolean),
            subCategories: subCategories.filter(Boolean),
            brand: brandId,
            subBrand: subBrandId,
            keyFeatures,
            specs: Object.keys(specs).length > 0 ? specs : undefined,
            images,
          });
        }

        results.success++;
      } catch (error: unknown) {
        results.failed++;
        results.errors.push(`Row ${i + 1}: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }

    return NextResponse.json(
      {
        message: "Import completed",
        results,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error importing products:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to import products" },
      { status: 500 }
    );
  }
}

// Helper function to parse CSV line handling quotes
function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  values.push(current);
  return values;
}
