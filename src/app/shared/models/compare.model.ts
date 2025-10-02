import { Product } from './product.model';

// src/app/shared/models/compare.model.ts
export interface CompareItem {
  product: Product;
  addedAt: Date;
}

export interface CompareList {
  items: Record<number, CompareItem[]>;
  totalItems: number;
  lastUpdated: Date;
}
