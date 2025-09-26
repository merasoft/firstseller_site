// src/app/shared/models/wishlist.model.ts
export interface WishlistItem {
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
  };
  addedAt: Date;
}

export interface Wishlist {
  items: WishlistItem[];
  totalItems: number;
  lastUpdated: Date;
}
