import { Component, ContentChild, Input, OnDestroy, TemplateRef } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductActionsService } from '../../services/product-actions.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnDestroy {
  @Input() product!: Product;
  @Input() showReviews = true;
  @Input() showBadge = true;
  @Input() showPrice = true;
  @Input() showOldPrice = true;
  @Input() showMonthlyPayment = true;
  @ContentChild('action', { static: false }) actionTemplate!: TemplateRef<any>;

  // Image cycling properties
  currentImageIndex = 0;
  private imageInterval: any;
  private readonly imageChangeInterval = 1000; // Change image every 1 second

  // Cached stars array to prevent recreation on every change detection
  private _cachedStars: Map<number, ('full' | 'empty' | 'half')[]> = new Map();

  constructor(private productActions: ProductActionsService, private translate: TranslateService) {}

  ngOnDestroy(): void {
    this.stopImageCycling();
  }

  // Image cycling methods
  startImageCycling(): void {
    if (!this.product.images || this.product.images.length < 2) return;

    this.currentImageIndex = 0;
    this.imageInterval = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.product.images.length;
    }, this.imageChangeInterval);
  }

  stopImageCycling(): void {
    if (this.imageInterval) {
      clearInterval(this.imageInterval);
      this.imageInterval = null;
    }
    this.currentImageIndex = 0;
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
    return this.productActions.isInCompare(this.product.categoryId, this.product.id);
  }

  // Utility functions
  formatPrice(price: number): string {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  getCurrency(): string {
    return this.translate.instant('COMMON.CURRENCY');
  }

  getTranslatedBadge(badgeText: string, badgeType?: string): string {
    // Translate common badge types
    switch (badgeType) {
      case 'super-price':
        return this.translate.instant('CATALOG.BADGES.SUPER_PRICE');
      case 'discount':
        return this.translate.instant('CATALOG.BADGES.DISCOUNT');
      case 'new':
        return this.translate.instant('CATALOG.BADGES.NEW');
      case 'top':
        return this.translate.instant('CATALOG.BADGES.HIT');
      default:
        return badgeText; // Return original text for unknown badges
    }
  }

  getReviewText(count: number): string {
    if (count === 1) {
      return this.translate.instant('PRODUCTS.REVIEW_SINGULAR');
    } else if (count >= 2 && count <= 4) {
      return this.translate.instant('PRODUCTS.REVIEW_FEW');
    } else {
      return this.translate.instant('PRODUCTS.REVIEW_MANY');
    }
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
