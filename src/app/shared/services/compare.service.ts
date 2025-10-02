// src/app/shared/services/compare.service.ts
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { CompareItem, CompareList } from '../models/compare.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CompareService {
  private readonly STORAGE_KEY = 'firstseller_compare';
  private readonly MAX_COMPARE_ITEMS = 4;

  private compareSubject = new BehaviorSubject<CompareList>(this.loadCompareFromStorage());
  public compare$ = this.compareSubject.asObservable();

  constructor(private messageService: MessageService, private translate: TranslateService) {}

  // Get current compare list
  getCurrentCompare(): CompareList {
    return this.compareSubject.value;
  }

  // Add item to compare
  addToCompare(product: Product): boolean {
    const currentCompare = this.getCurrentCompare();
    if (!(product.categoryId in currentCompare.items)) {
      currentCompare.items[product.categoryId] = [];
    }

    // Check if compare list is full
    if (currentCompare.items[product.categoryId].length >= this.MAX_COMPARE_ITEMS) {
      this.messageService.add({
        severity: 'error',
        summary: this.translate.instant('TOAST.COMPARE.LIST_FULL_ERROR'),
        detail: this.translate.instant('TOAST.COMPARE.LIST_FULL_DETAIL'),
        life: 4000,
      });
      return false;
    }

    // Add new compare item
    currentCompare.items[product.categoryId] = [
      ...currentCompare.items[product.categoryId],
      {
        product,
        addedAt: new Date(),
      },
    ];

    const updatedCompare: CompareList = {
      items: {
        ...currentCompare.items,
        [product.categoryId]: currentCompare.items[product.categoryId],
      },
      totalItems: currentCompare.totalItems + 1,
      lastUpdated: new Date(),
    };

    this.updateCompare(updatedCompare);

    // Show success toast notification
    this.messageService.add({
      severity: 'success',
      summary: this.translate.instant('TOAST.COMPARE.ADDED_SUCCESS'),
      detail: `${product.name}`,
      life: 3000,
    });

    return true;
  }

  // Remove item from compare
  removeFromCompare(product: Product): void {
    const currentCompare = this.getCurrentCompare();
    const categoryId = product.categoryId;
    if (!(categoryId in currentCompare.items)) return;
    if (!this.isInCompare(categoryId, product.id)) return;

    const removedItem = currentCompare.items[categoryId].find((item) => item.product.id === product.id);
    const updatedItems = {
      ...currentCompare.items,
      [categoryId]: currentCompare.items[categoryId].filter((item) => item.product.id !== product.id),
    };

    const updatedCompare: CompareList = {
      items: updatedItems,
      totalItems: currentCompare.totalItems - 1,
      lastUpdated: new Date(),
    };
    this.updateCompare(updatedCompare);

    // Show removal toast notification
    if (removedItem) {
      this.messageService.add({
        severity: 'info',
        summary: this.translate.instant('TOAST.COMPARE.REMOVED_SUCCESS'),
        detail: `${removedItem.product.name}`,
        life: 3000,
      });
    }
  }

  // Check if product is in compare
  isInCompare(categoryId: number, productId: number): boolean {
    const currentCompare = this.getCurrentCompare();
    return categoryId in currentCompare.items && currentCompare.items[categoryId].some((item) => item.product.id === productId);
  }

  // Toggle product in compare
  toggleCompare(product: Product): boolean {
    if (this.isInCompare(product.categoryId, product.id)) {
      this.removeFromCompare(product);
      return false;
    } else {
      return this.addToCompare(product);
    }
  }

  // Clear entire compare list
  clearCompare(): void {
    const emptyCompare: CompareList = {
      items: [],
      totalItems: 0,
      lastUpdated: new Date(),
    };
    this.updateCompare(emptyCompare);

    this.messageService.add({
      severity: 'info',
      summary: this.translate.instant('TOAST.COMPARE.CLEARED_SUCCESS'),
      detail: this.translate.instant('TOAST.COMPARE.CLEARED_DETAIL'),
      life: 3000,
    });
  }

  // Get compare items count
  getItemsCount(): number {
    return this.getCurrentCompare().totalItems;
  }

  // Get max compare items allowed
  getMaxItems(): number {
    return this.MAX_COMPARE_ITEMS;
  }

  // Private methods
  private updateCompare(compare: CompareList): void {
    this.compareSubject.next(compare);
    this.saveCompareToStorage(compare);
  }

  private loadCompareFromStorage(): CompareList {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed: CompareList = JSON.parse(stored);
        parsed.lastUpdated = new Date(parsed.lastUpdated);
        Object.keys(parsed.items).forEach((key) => {
          parsed.items[+key] = parsed.items[+key].map((item) => ({
            ...item,
            addedAt: new Date(item.addedAt),
          }));
        });

        return parsed;
      }
    } catch (error) {
      console.error('Error loading compare from storage:', error);
    }

    return {
      items: [],
      totalItems: 0,
      lastUpdated: new Date(),
    };
  }

  private saveCompareToStorage(compare: CompareList): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(compare));
    } catch (error) {
      console.error('Error saving compare to storage:', error);
    }
  }
}
