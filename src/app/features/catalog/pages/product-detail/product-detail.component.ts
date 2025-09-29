// src/app/features/catalog/pages/product-detail/product-detail.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from '../../../../shared/services/cart.service';
import { ProductActionsService } from '../../../../shared/services/product-actions.service';
import { TranslateService } from '@ngx-translate/core';

interface ProductVariant {
  id: string;
  color: string;
  colorCode: string;
  memory: string;
  price: number;
  oldPrice?: number;
  inStock: boolean;
}

interface ProductSpecification {
  category: string;
  items: { name: string; value: string }[];
}

interface InstallmentPlan {
  id: string;
  index: number;
  months: number;
  monthlyPayment: number;
  totalAmount: number;
  interestRate: number;
}

interface PaymentProvider {
  id: string;
  name: string;
  logo: string;
  additionalFee: number;
}

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private _cachedStars: Map<number, ('full' | 'empty' | 'half')[]> = new Map();
  private destroy$ = new Subject<void>();

  productId: string = '';
  selectedImageIndex = 0;
  selectedVariant: any;
  selectedColor = '';
  selectedMemory = '';
  activeTab = 'description';
  quantity = 0;

  // PrimeNG Breadcrumb
  breadcrumbItems: MenuItem[] = [];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  // Product data
  product = {
    id: 'samsung-galaxy-s25',
    name: 'Смартфон SAMSUNG Galaxy S25 SM-S931B/DS (256GB) Navy',
    brand: 'Samsung',
    model: 'Galaxy S25',
    article: 'SM-S931BDBCS02',
    rating: 4.56,
    reviewsCount: 128,
    bonusPoints: 140462,
    isInStock: true,
    warranty: '1 год',
    freeDelivery: true,

    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],

    variants: [
      {
        id: 'navy-256',
        color: 'Синий',
        colorCode: '#1e3a8a',
        memory: '256 ГБ',
        price: 14046200,
        oldPrice: 15500000,
        inStock: true,
      },
      {
        id: 'graphite-256',
        color: 'Графитовый',
        colorCode: '#374151',
        memory: '256 ГБ',
        price: 14046200,
        oldPrice: 15500000,
        inStock: true,
      },
      {
        id: 'silver-256',
        color: 'Серебристый',
        colorCode: '#e5e7eb',
        memory: '256 ГБ',
        price: 14046200,
        oldPrice: 15500000,
        inStock: true,
      },
      {
        id: 'navy-512',
        color: 'Синий',
        colorCode: '#1e3a8a',
        memory: '512 ГБ',
        price: 16046200,
        oldPrice: 17500000,
        inStock: true,
      },
    ],

    description: `
      Galaxy S25 от Samsung — это сбалансированное устройство, сочетающее в себе производительность, камеру с расширенными
      возможностями, энергоэффективность и поддержку 5G. Модель подойдет тем, кто ищет смартфон с качественным экраном, стильным
      дизайном и простой в любых условиях. Устройство доступно в элегантном корпусе и с объемом памяти 256 ГБ.
    `,

    specifications: [
      {
        category: 'Основные характеристики',
        items: [
          { name: 'Материал корпуса', value: 'Алюминий, стекло' },
          { name: 'Тип телефона', value: 'Смартфон' },
          { name: 'Тип SIM-карты', value: 'nano-SIM / eSIM' },
          { name: 'Тип процессора', value: 'Qualcomm Snapdragon 8 Elite' },
          { name: 'Количество ядер процессора', value: '8' },
        ],
      },
      {
        category: 'Дисплей',
        items: [
          { name: 'Диагональ экрана', value: '6.2"' },
          { name: 'Разрешение экрана', value: '2340x1080' },
          { name: 'Тип экрана', value: 'Dynamic AMOLED 2X' },
          { name: 'Частота обновления', value: '120 Гц' },
        ],
      },
      {
        category: 'Камера',
        items: [
          { name: 'Основная камера', value: '50 МП + 12 МП + 10 МП' },
          { name: 'Фронтальная камера', value: '12 МП' },
          { name: 'Запись видео', value: '8K при 24 к/с' },
          { name: 'Стабилизация', value: 'Оптическая (OIS)' },
        ],
      },
    ],
  };

  breadcrumbs = [
    { name: 'Главная', url: '/' },
    { name: 'Электроника', url: '/catalog' },
    { name: 'Телефоны и гаджеты', url: '/catalog/smartphones' },
    { name: 'Все смартфоны', url: '/catalog/smartphones' },
    { name: 'Смартфон SAMSUNG Galaxy S25', url: '' },
  ];

  installmentPlans: InstallmentPlan[] = [
    { id: '0-0-3', index: 1, months: 3, monthlyPayment: 4682067, totalAmount: 14046200, interestRate: 0 },
    { id: '0-5-6', index: 2, months: 6, monthlyPayment: 2451304, totalAmount: 14707824, interestRate: 5 },
    { id: '0-10-9', index: 3, months: 9, monthlyPayment: 1711802, totalAmount: 15406218, interestRate: 10 },
    { id: '0-15-12', index: 4, months: 12, monthlyPayment: 1344454, totalAmount: 16133448, interestRate: 15 },
  ];

  selectedInstallmentPlan = this.installmentPlans[0];

  paymentProviders: PaymentProvider[] = [
    { id: 'xazna', name: 'Xazna', logo: '/assets/images/xazna.png', additionalFee: 0 },
    { id: 'uzum', name: 'Uzum', logo: '/assets/images/uzum.png', additionalFee: 75000 },
  ];

  selectedPaymentProvider = this.paymentProviders[0];

  tabs = [
    { id: 'description', name: '', active: true },
    { id: 'specifications', name: '', active: false },
    { id: 'reviews', name: '', active: false },
    { id: 'payment', name: '', active: false },
    { id: 'delivery', name: '', active: false },
    { id: 'discounts', name: '', active: false },
  ];

  constructor(private route: ActivatedRoute, private cartService: CartService, private productActions: ProductActionsService, private translate: TranslateService) {
    this.initializeTabNames();
    this.translate.onLangChange.subscribe(() => {
      this.initializeTabNames();
    });
  }

  initializeTabNames(): void {
    this.tabs[0].name = this.translate.instant('PRODUCTS.TABS.ABOUT_PRODUCT');
    this.tabs[1].name = this.translate.instant('PRODUCTS.TABS.SPECIFICATIONS');
    this.tabs[2].name = this.translate.instant('PRODUCTS.TABS.REVIEWS');
    this.tabs[3].name = this.translate.instant('PRODUCTS.TABS.PAYMENT');
    this.tabs[4].name = this.translate.instant('PRODUCTS.TABS.DELIVERY');
    this.tabs[5].name = this.translate.instant('PRODUCTS.TABS.DISCOUNTS_BONUSES');
  }

  loadProduct(): void {
    // Load product data from API
    console.log('Loading product:', this.productId);
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  onCarouselPageChange(event: any): void {
    this.selectedImageIndex = event.page;
  }

  selectColor(color: string): void {
    this.selectedColor = color;
    this.updateSelectedVariant();
    this.updateQuantityFromCart(); // Update quantity when variant changes
  }

  selectMemory(memory: string): void {
    this.selectedMemory = memory;
    this.updateSelectedVariant();
    this.updateQuantityFromCart(); // Update quantity when variant changes
  }

  updateSelectedVariant(): void {
    this.selectedVariant = this.product.variants.find((v) => v.color === this.selectedColor && v.memory === this.selectedMemory) || this.product.variants[0];
  }

  selectInstallmentPlan(plan: InstallmentPlan): void {
    this.selectedInstallmentPlan = plan;
  }

  selectPaymentProvider(provider: PaymentProvider): void {
    this.selectedPaymentProvider = provider;
  }

  increaseQuantity(): void {
    this.quantity++;
    this.syncWithCart();
  }

  decreaseQuantity(): void {
    if (this.quantity > 0) {
      this.quantity--;
      this.syncWithCart();
    }
  }

  private syncWithCart(): void {
    // Find the current cart item based on productId and variant
    const currentCart = this.cartService.getCart();
    const existingItem = currentCart.items.find(
      (item) =>
        item.productId === (parseInt(this.productId) || 1) &&
        JSON.stringify(item.selectedVariant) ===
          JSON.stringify({
            color: this.selectedColor,
            memory: this.selectedMemory,
          })
    );

    if (existingItem && this.quantity > 0) {
      // Update existing item quantity
      this.cartService.updateQuantity(existingItem.id, this.quantity);
    } else if (existingItem && this.quantity === 0) {
      // Remove item if quantity is 0
      this.cartService.removeFromCart(existingItem.id);
    }
    // If no existing item and quantity > 0, addToCart will be called from the cart button
  }

  private updateQuantityFromCart(): void {
    // Update local quantity based on cart state
    const currentCart = this.cartService.getCart();
    const existingItem = currentCart.items.find(
      (item) =>
        item.productId === (parseInt(this.productId) || 1) &&
        JSON.stringify(item.selectedVariant) ===
          JSON.stringify({
            color: this.selectedColor,
            memory: this.selectedMemory,
          })
    );

    this.quantity = existingItem ? existingItem.quantity : 0;
  }

  addToCart(): void {
    if (this.quantity === 0) {
      this.quantity++;
      const cartItem = {
        productId: parseInt(this.productId) || 1,
        name: this.product.name,
        image: this.product.images[0],
        price: this.selectedVariant?.price || this.product.variants[0].price,
        oldPrice: this.selectedVariant?.oldPrice || this.product.variants[0].oldPrice,
        quantity: this.quantity,
        selectedVariant: {
          color: this.selectedColor,
          memory: this.selectedMemory,
        },
        inStock: this.selectedVariant?.inStock || this.product.variants[0].inStock,
      };

      this.cartService.addToCart(cartItem);
    }
  }

  buyNow(): void {
    console.log('Buy now:', {
      product: this.product,
      variant: this.selectedVariant,
      quantity: this.quantity,
    });
  }

  addToFavorites(): void {
    const productForWishlist = {
      id: parseInt(this.product.id.split('-')[0]) || 1, // Convert string id to number
      name: this.product.name,
      images: this.product.images,
      currentImageIndex: 0,
      price: this.selectedVariant?.price || this.product.variants[0].price,
      oldPrice: this.selectedVariant?.oldPrice || this.product.variants[0].oldPrice,
      monthlyPayment: Math.round((this.selectedVariant?.price || this.product.variants[0].price) / 12),
      installmentMonths: 12,
      rating: this.product.rating,
      reviewsCount: this.product.reviewsCount,
      badge: this.selectedVariant?.oldPrice ? `${Math.round((1 - this.selectedVariant.price / this.selectedVariant.oldPrice) * 100)}%` : undefined,
      badgeType: this.selectedVariant?.oldPrice ? ('discount' as const) : undefined,
      brand: this.product.brand,
      memory: this.selectedMemory || this.product.variants[0].memory,
      processor: 'Snapdragon', // Default processor
      inStock: this.selectedVariant?.inStock || this.product.variants[0].inStock,
    };

    this.productActions.addToFavorites(productForWishlist);
  }

  compareProduct(): void {
    const productForCompare = {
      id: parseInt(this.product.id.split('-')[0]) || 1, // Convert string id to number
      name: this.product.name,
      images: this.product.images,
      currentImageIndex: 0,
      price: this.selectedVariant?.price || this.product.variants[0].price,
      oldPrice: this.selectedVariant?.oldPrice || this.product.variants[0].oldPrice,
      monthlyPayment: Math.round((this.selectedVariant?.price || this.product.variants[0].price) / 12),
      installmentMonths: 12,
      rating: this.product.rating,
      reviewsCount: this.product.reviewsCount,
      badge: this.selectedVariant?.oldPrice ? `${Math.round((1 - this.selectedVariant.price / this.selectedVariant.oldPrice) * 100)}%` : undefined,
      badgeType: this.selectedVariant?.oldPrice ? ('discount' as const) : undefined,
      brand: this.product.brand,
      memory: this.selectedMemory || this.product.variants[0].memory,
      processor: 'Snapdragon', // Default processor
      inStock: this.selectedVariant?.inStock || this.product.variants[0].inStock,
    };

    this.productActions.addToCompare(productForCompare);
  }

  isInWishlist(): boolean {
    const productId = parseInt(this.product.id.split('-')[0]) || 1;
    return this.productActions.isInWishlist(productId);
  }

  isInCompare(): boolean {
    const productId = parseInt(this.product.id.split('-')[0]) || 1;
    return this.productActions.isInCompare(productId);
  }

  shareProduct(): void {
    console.log('Share product:', this.product.id);
  }

  formatPrice(price: number): string {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  getAvailableColors(): string[] {
    return [...new Set(this.product.variants.map((v) => v.color))];
  }

  getAvailableMemory(): string[] {
    return [...new Set(this.product.variants.map((v) => v.memory))];
  }

  isColorAvailable(color: string): boolean {
    return this.product.variants.some((v) => v.color === color && v.memory === this.selectedMemory);
  }

  isMemoryAvailable(memory: string): boolean {
    return this.product.variants.some((v) => v.memory === memory && v.color === this.selectedColor);
  }

  getColorCode(color: string): string {
    const variant = this.product.variants.find((v) => v.color === color);
    return variant?.colorCode || '#000000';
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

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'] || 'samsung-galaxy-s25';
      this.loadProduct();
    });

    // Initialize PrimeNG breadcrumbs
    this.breadcrumbItems = [
      { label: 'Электроника', routerLink: '/catalog' },
      { label: 'Телефоны и гаджеты', routerLink: '/catalog/smartphones' },
      { label: 'Все смартфоны', routerLink: '/catalog/smartphones' },
      { label: this.product.name },
    ];

    // Set initial variant
    this.selectedVariant = this.product.variants[0];
    this.selectedColor = this.selectedVariant.color;
    this.selectedMemory = this.selectedVariant.memory;

    // Initialize quantity from cart
    this.updateQuantityFromCart();

    // Subscribe to cart changes to keep quantity in sync
    this.cartService.cart$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateQuantityFromCart();
    });
  }

  // Translation utility methods
  getCurrency(): string {
    return this.translate.instant('COMMON.CURRENCY');
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

  getBonusText(): string {
    return this.translate.instant('PRODUCTS.BONUS_POINTS');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
