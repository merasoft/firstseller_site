// src/app/shared/services/compare.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { CompareItem, CompareList } from '../models/compare.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CompareService {
  private readonly STORAGE_KEY = 'firstseller_compare';
  private readonly MAX_COMPARE_ITEMS = 4; // Typical limit for product comparison

  private compareSubject = new BehaviorSubject<CompareList>(this.loadCompareFromStorage());
  public compare$ = this.compareSubject.asObservable();

  constructor(private messageService: MessageService) {}

  // Get current compare list
  getCurrentCompare(): CompareList {
    return this.compareSubject.value;
  }

  // Add item to compare
  addToCompare(product: Product): boolean {
    const currentCompare = this.getCurrentCompare();

    // Check if item already exists
    const existingItemIndex = currentCompare.items.findIndex((item) => item.product.id === product.id);
    if (existingItemIndex !== -1) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Уже в сравнении',
        detail: `${product.name} уже добавлен в сравнение`,
        life: 3000,
      });
      return false;
    }

    // Check category compatibility
    if (currentCompare.items.length > 0 && currentCompare.currentCategoryId && product.categoryId !== currentCompare.currentCategoryId) {
      this.messageService.add({
        severity: 'error',
        summary: 'Разные категории',
        detail: `Можно сравнивать только товары из одной категории. Очистите список сравнения или выберите товар из категории "${currentCompare.currentCategory}".`,
        life: 5000,
      });
      return false;
    }

    // Check if compare list is full
    if (currentCompare.items.length >= this.MAX_COMPARE_ITEMS) {
      this.messageService.add({
        severity: 'error',
        summary: 'Список сравнения заполнен',
        detail: `Максимум ${this.MAX_COMPARE_ITEMS} товара для сравнения. Удалите товар чтобы добавить новый.`,
        life: 4000,
      });
      return false;
    }

    // Create new compare item
    const compareItem: CompareItem = {
      id: Date.now(), // Simple ID generation
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice,
        images: product.images,
        rating: product.rating,
        reviewsCount: product.reviewsCount,
        badge: product.badge,
        badgeType: product.badgeType,
        inStock: product.inStock,
        brand: product.brand,
        memory: product.memory,
        processor: product.processor,
        categoryId: product.categoryId,
        category: product.category,
      },
      addedAt: new Date(),
    };

    const updatedCompare: CompareList = {
      items: [...currentCompare.items, compareItem],
      totalItems: currentCompare.totalItems + 1,
      lastUpdated: new Date(),
      currentCategoryId: product.categoryId || currentCompare.currentCategoryId,
      currentCategory: product.category || currentCompare.currentCategory,
    };

    this.updateCompare(updatedCompare);

    // Show success toast notification
    this.messageService.add({
      severity: 'success',
      summary: 'Добавлено в сравнение',
      detail: `${product.name} добавлен в сравнение`,
      life: 3000,
    });

    return true;
  }

  // Remove item from compare
  removeFromCompare(productId: number): void {
    const currentCompare = this.getCurrentCompare();
    const removedItem = currentCompare.items.find((item) => item.product.id === productId);
    const updatedItems = currentCompare.items.filter((item) => item.product.id !== productId);

    const updatedCompare: CompareList = {
      items: updatedItems,
      totalItems: updatedItems.length,
      lastUpdated: new Date(),
      // Reset category if no items left
      currentCategoryId: updatedItems.length > 0 ? currentCompare.currentCategoryId : undefined,
      currentCategory: updatedItems.length > 0 ? currentCompare.currentCategory : undefined,
    };

    this.updateCompare(updatedCompare);

    // Show removal toast notification
    if (removedItem) {
      this.messageService.add({
        severity: 'info',
        summary: 'Удалено из сравнения',
        detail: `${removedItem.product.name} удален из сравнения`,
        life: 3000,
      });
    }
  }

  // Check if product is in compare
  isInCompare(productId: number): boolean {
    const currentCompare = this.getCurrentCompare();
    return currentCompare.items.some((item) => item.product.id === productId);
  }

  // Toggle product in compare
  toggleCompare(product: Product): boolean {
    if (this.isInCompare(product.id)) {
      this.removeFromCompare(product.id);
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
      currentCategoryId: undefined,
      currentCategory: undefined,
    };

    this.updateCompare(emptyCompare);

    this.messageService.add({
      severity: 'info',
      summary: 'Сравнение очищено',
      detail: 'Все товары удалены из сравнения',
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

  // Get current comparison category
  getCurrentCategory(): string | undefined {
    return this.getCurrentCompare().currentCategory;
  }

  // Get current comparison category ID
  getCurrentCategoryId(): number | undefined {
    return this.getCurrentCompare().currentCategoryId;
  }

  // Debug method to check compare state
  debugCompareState(): void {
    const compare = this.getCurrentCompare();
    console.log('Compare State Debug:', {
      totalItems: compare.totalItems,
      currentCategory: compare.currentCategory,
      currentCategoryId: compare.currentCategoryId,
      items: compare.items.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        categoryId: item.product.categoryId,
        category: item.product.category,
      })),
    });
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
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        parsed.lastUpdated = new Date(parsed.lastUpdated);
        parsed.items.forEach((item: CompareItem) => {
          item.addedAt = new Date(item.addedAt);
        });
        return parsed;
      }
    } catch (error) {
      console.error('Error loading compare from storage:', error);
    }

    // Return empty compare if nothing in storage or error occurred
    return {
      items: [],
      totalItems: 0,
      lastUpdated: new Date(),
      currentCategoryId: undefined,
      currentCategory: undefined,
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
