// src/app/shared/services/wishlist.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { WishlistItem, Wishlist } from '../models/wishlist.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly STORAGE_KEY = 'firstseller_wishlist';

  private wishlistSubject = new BehaviorSubject<Wishlist>(this.loadWishlistFromStorage());
  public wishlist$ = this.wishlistSubject.asObservable();

  constructor(private messageService: MessageService, private translate: TranslateService) {}

  // Get current wishlist
  getCurrentWishlist(): Wishlist {
    return this.wishlistSubject.value;
  }

  // Add item to wishlist
  addToWishlist(product: Product): void {
    const currentWishlist = this.getCurrentWishlist();

    // Check if item already exists
    const existingItemIndex = currentWishlist.items.findIndex((item) => item.product.id === product.id);

    if (existingItemIndex === -1) {
      // Create new wishlist item
      const wishlistItem: WishlistItem = {
        id: Date.now(), // Simple ID generation
        product,
        addedAt: new Date(),
      };

      const updatedWishlist: Wishlist = {
        items: [...currentWishlist.items, wishlistItem],
        totalItems: currentWishlist.totalItems + 1,
        lastUpdated: new Date(),
      };

      this.updateWishlist(updatedWishlist);

      // Show success toast notification
      this.messageService.add({
        severity: 'success',
        summary: this.translate.instant('TOAST.WISHLIST.ADDED_SUCCESS'),
        detail: `${product.name}`,
        life: 3000,
      });
    }
  }

  // Remove item from wishlist
  removeFromWishlist(productId: number): void {
    const currentWishlist = this.getCurrentWishlist();
    const removedItem = currentWishlist.items.find((item) => item.product.id === productId);
    const updatedItems = currentWishlist.items.filter((item) => item.product.id !== productId);

    const updatedWishlist: Wishlist = {
      items: updatedItems,
      totalItems: updatedItems.length,
      lastUpdated: new Date(),
    };

    this.updateWishlist(updatedWishlist);

    // Show removal toast notification
    if (removedItem) {
      this.messageService.add({
        severity: 'info',
        summary: this.translate.instant('TOAST.WISHLIST.REMOVED_SUCCESS'),
        detail: `${removedItem.product.name}`,
        life: 3000,
      });
    }
  }

  // Check if product is in wishlist
  isInWishlist(productId: number): boolean {
    const currentWishlist = this.getCurrentWishlist();
    return currentWishlist.items.some((item) => item.product.id === productId);
  }

  // Toggle product in wishlist
  toggleWishlist(product: Product): boolean {
    if (this.isInWishlist(product.id)) {
      this.removeFromWishlist(product.id);
      return false;
    } else {
      this.addToWishlist(product);
      return true;
    }
  }

  // Clear entire wishlist
  clearWishlist(): void {
    const emptyWishlist: Wishlist = {
      items: [],
      totalItems: 0,
      lastUpdated: new Date(),
    };

    this.updateWishlist(emptyWishlist);
  }

  // Get wishlist items count
  getItemsCount(): number {
    return this.getCurrentWishlist().totalItems;
  }

  // Private methods
  private updateWishlist(wishlist: Wishlist): void {
    this.wishlistSubject.next(wishlist);
    this.saveWishlistToStorage(wishlist);
  }

  private loadWishlistFromStorage(): Wishlist {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        parsed.lastUpdated = new Date(parsed.lastUpdated);
        parsed.items.forEach((item: WishlistItem) => {
          item.addedAt = new Date(item.addedAt);
        });
        return parsed;
      }
    } catch (error) {
      console.error('Error loading wishlist from storage:', error);
    }

    // Return empty wishlist if nothing in storage or error occurred
    return {
      items: [],
      totalItems: 0,
      lastUpdated: new Date(),
    };
  }

  private saveWishlistToStorage(wishlist: Wishlist): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(wishlist));
    } catch (error) {
      console.error('Error saving wishlist to storage:', error);
    }
  }
}
