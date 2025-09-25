import { Component, Input, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductActionsService } from '../../services/product-actions.service';
import { default as Hammer } from 'hammerjs';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements AfterViewInit, OnDestroy {
  @Input() product!: Product;
  @ViewChild('imageContainer', { static: false }) imageContainer!: ElementRef;

  // Cached stars array to prevent recreation on every change detection
  private _cachedStars: Map<number, ('full' | 'empty' | 'half')[]> = new Map();

  // Touch/swipe properties
  private touchStartX: number = 0;
  private touchEndX: number = 0;
  private touchStartY: number = 0;
  private touchEndY: number = 0;
  private minSwipeDistance: number = 50;
  private maxVerticalDeviation: number = 100; // Allow some vertical movement
  private hammer: HammerManager | null = null;
  isSwipping: boolean = false;
  private lastSwipeTime: number = 0;

  constructor(private productActions: ProductActionsService) {}

  ngAfterViewInit(): void {
    this.initializeHammer();
  }

  ngOnDestroy(): void {
    if (this.hammer) {
      this.hammer.destroy();
    }
  }

  private initializeHammer(): void {
    if (this.imageContainer && this.product.images.length > 1) {
      this.hammer = new Hammer.Manager(this.imageContainer.nativeElement);
      const swipe = new Hammer.Swipe({ direction: Hammer.DIRECTION_HORIZONTAL });
      this.hammer.add(swipe);

      this.hammer.on('swipeleft', () => {
        this.nextImage(this.product);
      });

      this.hammer.on('swiperight', () => {
        this.previousImage(this.product);
      });
    }
  }

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

  // Touch/swipe event handlers
  onTouchStart(event: TouchEvent): void {
    if (this.product.images.length <= 1) return;

    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
    this.isSwipping = false; // Reset state
  }

  onTouchEnd(event: TouchEvent): void {
    if (this.product.images.length <= 1) return;

    this.touchEndX = event.changedTouches[0].clientX;
    this.touchEndY = event.changedTouches[0].clientY;
    const wasSwipe = this.handleSwipe();

    // Only prevent default behavior if we detected and handled a swipe
    if (wasSwipe) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Reset swipping state after a short delay
    setTimeout(() => {
      this.isSwipping = false;
    }, 150);
  }

  private handleSwipe(): boolean {
    const horizontalDistance = this.touchStartX - this.touchEndX;
    const verticalDistance = Math.abs(this.touchStartY - this.touchEndY);

    // Check if this is primarily a horizontal swipe
    if (Math.abs(horizontalDistance) < this.minSwipeDistance) {
      return false; // Not a significant horizontal swipe
    }

    // Check if vertical movement is too much (indicating scroll attempt)
    if (verticalDistance > this.maxVerticalDeviation) {
      return false; // Too much vertical movement, probably a scroll
    }

    // Set swipping state to true when we detect an actual swipe
    this.isSwipping = true;
    this.lastSwipeTime = Date.now();

    if (horizontalDistance > 0) {
      // Swipe left - next image
      this.nextImage(this.product);
    } else {
      // Swipe right - previous image
      this.previousImage(this.product);
    }

    return true; // Indicate that a swipe was handled
  }

  // Handle image container clicks (prevent navigation after swipe)
  onImageContainerClick(event: Event): void {
    // If a swipe occurred recently, prevent the click from navigating
    if (Date.now() - this.lastSwipeTime < 300) {
      event.preventDefault();
      event.stopPropagation();
    }
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
