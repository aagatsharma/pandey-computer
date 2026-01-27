import { ShopClient } from "@/components/shop/shop-client";
import { Suspense } from "react";

export default function ShopPage() {
  return (
    <Suspense>
      <ShopClient />
    </Suspense>
  );
}
