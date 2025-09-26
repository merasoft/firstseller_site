// src/app/shared/models/cart.model.ts
export interface CartItem {
  id: string;
  productId: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  quantity: number;
  selectedVariant?: {
    color?: string;
    memory?: string;
    size?: string;
  };
  inStock: boolean;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}
