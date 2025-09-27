// src/app/features/catalog/pages/compare/compare.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../../../shared/models/product.model';
import { CompareService } from '../../../../shared/services/compare.service';
import { CartService } from '../../../../shared/services/cart.service';
import { CompareItem, CompareList } from '../../../../shared/models/compare.model';

@Component({
  selector: 'app-compare',
  standalone: false,
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
})
export class CompareComponent implements OnInit, OnDestroy {
  pageTitle = 'Сравнение товаров';
  compare: CompareList = { items: [], totalItems: 0, lastUpdated: new Date() };
  compareProducts: Product[] = [];
  maxCompareItems = 4;
  private destroy$ = new Subject<void>();

  constructor(private compareService: CompareService, private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.maxCompareItems = this.compareService.getMaxItems();
    this.loadCompareData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadCompareData(): void {
    this.compareService.compare$.pipe(takeUntil(this.destroy$)).subscribe((compare) => {
      this.compare = compare;
      // Convert compare items to Product array for product-card component
      this.compareProducts = compare.items.map((item) => ({
        ...item.product,
        currentImageIndex: 0,
        monthlyPayment: Math.round(item.product.price / 12),
        installmentMonths: 12,
        memory: item.product.memory || '',
        processor: item.product.processor || '',
      }));
    });
  }

  hasMemorySpecs(): boolean {
    return this.compare.items.some((item) => item.product.memory);
  }

  hasProcessorSpecs(): boolean {
    return this.compare.items.some((item) => item.product.processor);
  }

  removeFromCompare(productId: number): void {
    this.compareService.removeFromCompare(productId);
  }

  clearCompare(): void {
    this.compareService.clearCompare();
  }

  addToCart(item: CompareItem): void {
    const cartItem = {
      productId: item.product.id,
      name: item.product.name,
      image: item.product.images[0],
      price: item.product.price,
      oldPrice: item.product.oldPrice,
      quantity: 1,
      selectedVariant: {
        color: item.product.brand,
        memory: item.product.memory || '',
      },
      inStock: item.product.inStock,
    };

    this.cartService.addToCart(cartItem);
  }

  continueShopping(): void {
    this.router.navigate(['/catalog']);
  }

  // Utility functions
  formatPrice(price: number): string {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  trackByItemId(index: number, item: CompareItem): number {
    return item.id;
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
