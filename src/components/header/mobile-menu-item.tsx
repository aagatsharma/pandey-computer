"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";

interface NavbarItem {
  _id: string;
  label: string;
  slug: string;
  level: 1 | 2 | 3;
  type: "category" | "brand" | "subCategory" | "subBrand";
  children?: NavbarItem[];
}

interface MobileMenuItemProps {
  item: NavbarItem;
  parentParams: string;
  closeMenu: () => void;
}

export default function MobileMenuItem({
  item,
  parentParams,
  closeMenu,
}: MobileMenuItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const hasChildren = item.children && item.children.length > 0;

  // Construct the query params for this item
  const currentParams = parentParams
    ? `${parentParams}&${item.type}=${item.slug}`
    : `${item.type}=${item.slug}`;

  const href = `/shop?${currentParams}`;
  const isActive =
    pathname.startsWith("/shop") && pathname.includes(currentParams);

  if (!hasChildren) {
    return (
      <li>
        <Link
          href={href}
          className={`block py-3 px-4 text-sm rounded-md transition-colors ${
            isActive
              ? "bg-primary/10 text-primary font-medium"
              : "text-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
          onClick={closeMenu}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <div className="flex flex-col">
        <div
          className={`flex items-center justify-between py-3 px-4 rounded-md transition-colors cursor-pointer ${
            isActive || isExpanded ? "bg-accent/50" : "hover:bg-accent"
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span
            className={`text-sm ${isActive ? "text-primary font-medium" : "text-foreground"}`}
          >
            {item.label}
          </span>
          <button
            className="p-1 hover:bg-background rounded-full transition-colors"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>
        {isExpanded && (
          <ul className="pl-4 border-l ml-4 space-y-1 my-1">
            {/* Link to the category itself */}
            <li>
              <Link
                href={href}
                className="block py-2 px-4 text-sm text-muted-foreground hover:text-primary transition-colors"
                onClick={closeMenu}
              >
                All {item.label}
              </Link>
            </li>
            {item.children!.map((child) => (
              <MobileMenuItem
                key={child._id}
                item={child}
                parentParams={currentParams}
                closeMenu={closeMenu}
              />
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}
