// src/app/features/catalog/pages/compare/compare.component.ts
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Carousel } from 'primeng/carousel';
import { Subject, takeUntil } from 'rxjs';
import { CompareItem, CompareList } from '../../../../shared/models/compare.model';
import { Product } from '../../../../shared/models/product.model';
import { CartService } from '../../../../shared/services/cart.service';
import { CompareService } from '../../../../shared/services/compare.service';
import { ProductActionsService } from '../../../../shared/services/product-actions.service';

@Component({
  selector: 'app-compare',
  standalone: false,
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
})
export class CompareComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private _cachedStars: Map<number, ('full' | 'empty' | 'half')[]> = new Map();
  @ViewChild('carousel') carousel: Carousel = {} as Carousel;

  pageTitle = '';
  compare: CompareList = { items: [], totalItems: 0, lastUpdated: new Date() };
  compareProducts: Product[] = [];
  maxCompareItems = 4;
  categories: any = [];
  activeCategoryId = 0;

  responsiveOptions = [
    {
      breakpoint: '950px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '730px',
      numVisible: 2,
      numScroll: 1,
    },
  ];

  constructor(private compareService: CompareService, private cartService: CartService, private productActions: ProductActionsService, private router: Router, private translate: TranslateService) {}

  private subscribeToLanguageChanges(): void {
    this.translate.onLangChange.subscribe(() => {
      this.pageTitle = this.translate.instant('COMPARE.TITLE');
    });
  }

  private loadCompareData(): void {
    this.compareService.compare$.pipe(takeUntil(this.destroy$)).subscribe((compare) => {
      this.compare = compare;
      this.categories = [];
      Object.values(compare.items).forEach((items) => {
        if (items.length === 0) return;
        this.categories.push({
          id: items[0].product.categoryId,
          name: items[0].product.category,
        });
      });

      if (this.categories.length > 0 && !this.activeCategoryId) {
        this.activeCategoryId = this.categories[0].id;
      }
      if (this.categories.length === 0) {
        this.compareProducts = [];
        return;
      }

      this.compareProducts = compare.items[this.activeCategoryId].map((item) => ({
        ...item.product,
        monthlyPayment: Math.round(item.product.price / 12),
        installmentMonths: 12,
        memory: item.product.memory || '',
        processor: item.product.processor || '',
      }));
    });
  }

  setActiveCategory(categoryId: number): void {
    this.activeCategoryId = categoryId;
    this.compareProducts = this.compare.items[categoryId].map((item) => ({
      ...item.product,
      monthlyPayment: Math.round(item.product.price / 12),
      installmentMonths: 12,
      memory: item.product.memory || '',
      processor: item.product.processor || '',
    }));
  }

  hasMemorySpecs(): boolean {
    return this.compare.items[this.activeCategoryId].some((item) => item.product.memory);
  }

  hasProcessorSpecs(): boolean {
    return this.compare.items[this.activeCategoryId].some((item) => item.product.processor);
  }

  removeFromCompare(product: Product): void {
    this.compareService.removeFromCompare(product);
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

  onBuyOneClick(product: Product): void {
    this.productActions.buyOneClick(product);
  }

  onAddToCart(product: Product): void {
    this.productActions.addToCart(product);
  }

  continueShopping(): void {
    this.router.navigate(['/catalog']);
  }

  formatPrice(price: number): string {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  trackByItemId(index: number, item: Product): number {
    return item.id;
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

  onPrevPageClick(event: any) {
    this.carousel.navBackward(event);
  }
  onNextPageClick(event: any) {
    this.carousel.navForward(event);
  }

  ngOnInit(): void {
    this.pageTitle = this.translate.instant('COMPARE.TITLE');
    this.maxCompareItems = this.compareService.getMaxItems();
    this.loadCompareData();
    this.subscribeToLanguageChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
