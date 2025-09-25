import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductActionsService } from '../../services/product-actions.service';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;

  // Cached stars array to prevent recreation on every change detection
  private _cachedStars: Map<number, ('full' | 'empty' | 'half')[]> = new Map();

  constructor(private productActions: ProductActionsService) {}

  // Handle image navigation for products
  previousImage(product: Product): void {
    if (product.currentImageIndex > 0) {
      product.currentImageIndex--;
    } else {
      product.currentImageIndex = product.images.length - 1;
    }
  }

  nextImage(product: Product): void {
    if (product.currentImageIndex < product.images.length - 1) {
      product.currentImageIndex++;
    } else {
      product.currentImageIndex = 0;
    }
  }

  setImage(product: Product, index: number): void {
    product.currentImageIndex = index;
  }

  // Product actions - now handled by service
  onBuyOneClick(product: Product): void {
    this.productActions.buyOneClick(product);
  }

  onAddToCart(product: Product): void {
    this.productActions.addToCart(product);
  }

  onAddToFavorites(product: Product): void {
    this.productActions.addToFavorites(product);
  }

  onAddToCompare(product: Product): void {
    this.productActions.addToCompare(product);
  }

  // Utility functions
  formatPrice(price: number): string {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  getStars(rating: number): ('full' | 'empty' | 'half')[] {
    // Use cached result to avoid creating new arrays on every call
    if (!this._cachedStars.has(rating)) {
      this._cachedStars.set(
        rating,
        Array(5)
          .fill(0)
          .map((_, i) => {
            if (rating >= i + 1) return 'full';
            if (rating >= i + 0.5) return 'half';
            return 'empty';
          })
      );
    }
    return this._cachedStars.get(rating)!;
  }

  getBadgeClasses(badgeType?: string): string {
    switch (badgeType) {
      case 'discount':
        return 'bg-orange-500 text-white';
      case 'super-price':
        return 'bg-orange-500 text-white';
      case 'new':
        return 'bg-red-500 text-white';
      case 'top':
        return 'bg-gray-800 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  }
}
