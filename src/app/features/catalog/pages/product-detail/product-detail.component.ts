// src/app/features/catalog/pages/product-detail/product-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';

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
  months: number;
  monthlyPayment: number;
  totalAmount: number;
  interestRate: number;
}

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  private _cachedStars: Map<number, ('full' | 'empty' | 'half')[]> = new Map();

  productId: string = '';
  selectedImageIndex = 0;
  selectedVariant: any;
  selectedColor = '';
  selectedMemory = '';
  activeTab = 'description';
  quantity = 1;

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
    { id: '0-0-3', months: 3, monthlyPayment: 4682067, totalAmount: 14046200, interestRate: 0 },
    { id: '0-0-6', months: 6, monthlyPayment: 2341033, totalAmount: 14046200, interestRate: 0 },
    { id: '0-0-9', months: 9, monthlyPayment: 1560689, totalAmount: 14046200, interestRate: 0 },
    { id: '0-0-12', months: 12, monthlyPayment: 1170517, totalAmount: 14046200, interestRate: 0 },
  ];

  selectedInstallmentPlan = this.installmentPlans[3]; // 12 months by default

  tabs = [
    { id: 'description', name: 'О товаре', active: true },
    { id: 'specifications', name: 'Характеристики', active: false },
    { id: 'reviews', name: 'Отзывы', active: false },
    { id: 'payment', name: 'Оплата', active: false },
    { id: 'delivery', name: 'Доставка', active: false },
    { id: 'discounts', name: 'Скидки и бонусы', active: false },
  ];

  constructor(private route: ActivatedRoute) {}

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
  }

  selectMemory(memory: string): void {
    this.selectedMemory = memory;
    this.updateSelectedVariant();
  }

  updateSelectedVariant(): void {
    this.selectedVariant = this.product.variants.find((v) => v.color === this.selectedColor && v.memory === this.selectedMemory) || this.product.variants[0];
  }

  selectInstallmentPlan(plan: InstallmentPlan): void {
    this.selectedInstallmentPlan = plan;
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    console.log('Add to cart:', {
      product: this.product,
      variant: this.selectedVariant,
      quantity: this.quantity,
    });
  }

  buyNow(): void {
    console.log('Buy now:', {
      product: this.product,
      variant: this.selectedVariant,
      quantity: this.quantity,
    });
  }

  addToFavorites(): void {
    console.log('Add to favorites:', this.product.id);
  }

  compareProduct(): void {
    console.log('Compare product:', this.product.id);
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
  }
}
