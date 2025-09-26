import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { CartService } from './cart.service';
import { WishlistService } from './wishlist.service';
import { CompareService } from './compare.service';

@Injectable({
  providedIn: 'root',
})
export class ProductActionsService {
  constructor(private cartService: CartService, private wishlistService: WishlistService, private compareService: CompareService) {}
  buyOneClick(product: Product): void {
    console.log('Buy one click:', product.name);
    // Global buy one click logic
    // Could navigate to checkout, open modal, etc.
  }

  addToCart(product: Product): void {
    const cartItem = {
      productId: product.id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      oldPrice: product.oldPrice,
      quantity: 1,
      selectedVariant: {
        color: product.brand, // Using brand as a variant for now
        memory: product.memory,
      },
      inStock: product.inStock,
    };

    this.cartService.addToCart(cartItem);
    this.cartService.openCartDrawer();
  }

  addToFavorites(product: Product): void {
    const isNowInWishlist = this.wishlistService.toggleWishlist(product);

    // Show appropriate message or feedback
    if (isNowInWishlist) {
      console.log('Added to wishlist:', product.name);
      // Could show success notification here
    } else {
      console.log('Removed from wishlist:', product.name);
      // Could show removal notification here
    }
  }

  // Method to check if product is in wishlist
  isInWishlist(productId: number): boolean {
    return this.wishlistService.isInWishlist(productId);
  }

  addToCompare(product: Product): void {
    const success = this.compareService.toggleCompare(product);
    // Toast notifications are handled by the CompareService
  }

  // Method to check if product is in compare
  isInCompare(productId: number): boolean {
    return this.compareService.isInCompare(productId);
  }
}
