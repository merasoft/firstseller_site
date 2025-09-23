import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductActionsService {
  buyOneClick(product: Product): void {
    console.log('Buy one click:', product.name);
    // Global buy one click logic
    // Could navigate to checkout, open modal, etc.
  }

  addToCart(product: Product): void {
    console.log('Add to cart:', product.name);
    // Global add to cart logic
    // Could update cart state, show notification, etc.
  }

  addToFavorites(product: Product): void {
    console.log('Add to favorites:', product.name);
    // Global favorites logic
    // Could update favorites state, show notification, etc.
  }

  addToCompare(product: Product): void {
    console.log('Add to compare:', product.name);
    // Global compare logic
    // Could update compare state, show notification, etc.
  }
}
