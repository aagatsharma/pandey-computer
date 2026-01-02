/**
 * TypeScript interfaces for Models
 * Use these types throughout the application for type safety
 */

import { Types } from "mongoose";

// ============================================
// Main Category Types (Level 1)
// ============================================
export interface IMainCategory {
  _id: string | Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Category Types (Level 2)
// ============================================
export interface ICategory {
  _id: string | Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  mainCategory: string | Types.ObjectId | IMainCategory;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Sub Category Types (Level 3)
// ============================================
export interface ISubCategory {
  _id: string | Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  category: string | Types.ObjectId | ICategory;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Brand Types (Level 2)
// ============================================
export interface IBrand {
  _id: string | Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  mainCategory?: string | Types.ObjectId | IMainCategory;
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Sub Brand Types (Level 3)
// ============================================
export interface ISubBrand {
  _id: string | Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  brand: string | Types.ObjectId | IBrand;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Product Types
// ============================================
export interface IProduct {
  _id: string | Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;

  // Categorization
  mainCategory?: string | Types.ObjectId | IMainCategory;
  category?: string | Types.ObjectId | ICategory;
  subCategory?: string | Types.ObjectId | ISubCategory;
  brand?: string | Types.ObjectId | IBrand;
  subBrand?: string | Types.ObjectId | ISubBrand;

  // Media
  images: string[];

  // Status
  quantity: number;
  isActive: boolean;
  isFeatured: boolean;

  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Navigation Menu Data Types (for frontend)
// ============================================
export interface NavMenuItem {
  label: string;
  slug: string;
  href?: string;
}

export interface NavMenuCategory {
  label: string;
  slug: string;
  items: NavMenuItem[];
}

export interface NavMenuData {
  label: string;
  slug: string;
  children: NavMenuCategory[];
}

// ============================================
// API Response Types
// ============================================
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  pagination?: PaginationInfo;
  error?: string;
}
