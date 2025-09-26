// src/app/shared/models/compare.model.ts
export interface CompareItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    oldPrice?: number;
    images: string[];
    rating: number;
    reviewsCount: number;
    badge?: string;
    badgeType?: 'discount' | 'super-price' | 'new' | 'top';
    inStock: boolean;
    brand: string;
    memory?: string;
    processor?: string;
    categoryId?: number;
    category?: string;
    // Additional comparison fields
    specifications?: {
      [key: string]: string;
    };
  };
  addedAt: Date;
}

export interface CompareList {
  items: CompareItem[];
  totalItems: number;
  lastUpdated: Date;
  currentCategoryId?: number;
  currentCategory?: string;
}
