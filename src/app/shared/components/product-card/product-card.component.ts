import { Component, Input, ViewChild } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductActionsService } from '../../services/product-actions.service';
import { Carousel } from 'primeng/carousel';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;
  @ViewChild('imageCarousel', { static: false }) imageCarousel!: Carousel;

  // Cached stars array to prevent recreation on every change detection
  private _cachedStars: Map<number, ('full' | 'empty' | 'half')[]> = new Map();

  constructor(private productActions: ProductActionsService) {}

  // Handle carousel page change event
  onCarouselPageChange(event: any): void {
    this.product.currentImageIndex = event.page;
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

  // Check if product is in wishlist
  isInWishlist(): boolean {
    return this.productActions.isInWishlist(this.product.id);
  }

  onAddToCompare(product: Product): void {
    this.productActions.addToCompare(product);
  }

  // Check if product is in compare list
  isInCompare(): boolean {
    return this.productActions.isInCompare(this.product.id);
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
