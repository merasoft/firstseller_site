import { Product } from './product.model';

// src/app/shared/models/wishlist.model.ts
export interface WishlistItem {
  id: number;
  product: Product;
  addedAt: Date;
}

export interface Wishlist {
  items: WishlistItem[];
  totalItems: number;
  lastUpdated: Date;
}
