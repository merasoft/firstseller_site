// src/app/shared/models/product.model.ts
export interface Product {
  id: number;
  name: string;
  images: string[];
  currentImageIndex: number;
  price: number;
  oldPrice?: number;
  monthlyPayment: number;
  installmentMonths: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  badgeType?: 'discount' | 'super-price' | 'new' | 'top';
  brand: string;
  memory: string;
  processor: string;
  inStock: boolean;
}
