// src/app/features/catalog/pages/catalog/catalog.component.ts
import { Component, OnInit } from '@angular/core';

interface Product {
  id: number;
  name: string;
  images: string[];
  currentImageIndex: number;
  price: number;
  oldPrice?: number;
  monthlyPayment: number;
  installmentMonths: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  badgeType?: 'discount' | 'super-price' | 'new' | 'top';
  brand: string;
  memory: string;
  processor: string;
  inStock: boolean;
}

interface Filter {
  id: string;
  name: string;
  type: 'range' | 'checkbox' | 'radio';
  options?: FilterOption[];
  min?: number;
  max?: number;
  currentMin?: number;
  currentMax?: number;
}

interface FilterOption {
  id: string;
  name: string;
  count: number;
  checked: boolean;
}

@Component({
  selector: 'app-catalog',
  standalone: false,
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  pageTitle = 'Смартфоны';
  totalProducts = 518;

  breadcrumbs = [
    { name: 'Главная', url: '/' },
    { name: 'Телефоны и гаджеты', url: '/category/phones' },
    { name: 'Телефоны', url: '/category/phones/mobile' },
    { name: 'Смартфоны', url: '/category/phones/smartphones' },
  ];

  quickFilters = ['Samsung S25', 'Honor X9C', 'Honor', 'iPhone', 'Samsung Galaxy S25 Ultra', 'Samsung', 'Samsung Galaxy S24 Ultra', 'iPhone 16', 'iPhone 16 Pro Max', 'iPhone 17 Pro Max'];

  sortOptions = [
    { value: 'popular', label: 'По популярности' },
    { value: 'price-asc', label: 'По цене ↑' },
    { value: 'price-desc', label: 'По цене ↓' },
    { value: 'rating', label: 'По рейтингу' },
    { value: 'new', label: 'Новинки' },
  ];

  selectedSort = 'popular';
  productsPerPage = 24;

  filters: Filter[] = [
    {
      id: 'price',
      name: 'Цена',
      type: 'range',
      min: 569000,
      max: 52314918,
      currentMin: 569000,
      currentMax: 52314918,
    },
    {
      id: 'brand',
      name: 'Производитель',
      type: 'checkbox',
      options: [
        { id: 'tecno', name: 'TECNO', count: 14, checked: false },
        { id: 'novey', name: 'Novey', count: 8, checked: false },
        { id: 'ajib', name: 'Ajib', count: 12, checked: false },
        { id: 'huawei', name: 'Huawei', count: 25, checked: false },
        { id: 'vivo', name: 'Vivo', count: 18, checked: false },
        { id: 'google', name: 'Google', count: 6, checked: false },
        { id: 'pixel', name: 'Pixel', count: 4, checked: false },
        { id: 'zte', name: 'ZTE', count: 9, checked: false },
        { id: 'green-lion', name: 'Green Lion', count: 3, checked: false },
      ],
    },
    {
      id: 'memory',
      name: 'Оперативная память',
      type: 'checkbox',
      options: [
        { id: '2gb', name: '2 ГБ', count: 15, checked: false },
        { id: '3gb', name: '3 ГБ', count: 22, checked: false },
        { id: '4gb', name: '4 ГБ', count: 45, checked: false },
        { id: '6gb', name: '6 ГБ', count: 78, checked: false },
        { id: '8gb', name: '8 ГБ', count: 156, checked: false },
        { id: '12gb', name: '12 ГБ', count: 89, checked: false },
        { id: '16gb', name: '16 ГБ', count: 23, checked: false },
      ],
    },
  ];

  products: Product[] = [
    {
      id: 1,
      name: 'Смартфон HONOR 400 Lite 5G 8/256 GB Velvet Grey',
      images: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      ],
      currentImageIndex: 0,
      price: 3049000,
      oldPrice: 3599000,
      monthlyPayment: 371000,
      installmentMonths: 12,
      rating: 5,
      reviewsCount: 8,
      badge: 'СУПЕР ЦЕНА',
      badgeType: 'super-price',
      brand: 'Honor',
      memory: '8GB',
      processor: 'Snapdragon',
      inStock: true,
    },
    {
      id: 2,
      name: 'Смартфон Samsung Galaxy S25 Ultra 12/256 ГБ Jet Black',
      images: [
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      ],
      currentImageIndex: 0,
      price: 13619000,
      oldPrice: 14879000,
      monthlyPayment: 1657000,
      installmentMonths: 12,
      rating: 5,
      reviewsCount: 5,
      badge: 'СУПЕР ЦЕНА',
      badgeType: 'super-price',
      brand: 'Samsung',
      memory: '12GB',
      processor: 'Exynos',
      inStock: true,
    },
    {
      id: 3,
      name: 'Смартфон Samsung Galaxy S25 Ultra 12/256 ГБ Titanium',
      images: [
        'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      ],
      currentImageIndex: 0,
      price: 14379000,
      oldPrice: 15079000,
      monthlyPayment: 1749500,
      installmentMonths: 12,
      rating: 5,
      reviewsCount: 0,
      badge: 'СКИДКА',
      badgeType: 'discount',
      brand: 'Samsung',
      memory: '12GB',
      processor: 'Exynos',
      inStock: true,
    },
    {
      id: 4,
      name: 'Смартфон Vivo X200 Ultra 12ГБ/256ГБ Black',
      images: [
        'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      ],
      currentImageIndex: 0,
      price: 15289000,
      oldPrice: 16119000,
      monthlyPayment: 1860200,
      installmentMonths: 12,
      rating: 5,
      reviewsCount: 0,
      badge: 'СУПЕР ЦЕНА',
      badgeType: 'super-price',
      brand: 'Vivo',
      memory: '12GB',
      processor: 'Snapdragon',
      inStock: true,
    },
    {
      id: 5,
      name: 'Смартфон Honor X9C 8/256 Titanium black беспроводные наушники в подарок',
      images: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      ],
      currentImageIndex: 0,
      price: 3959000,
      oldPrice: 4709000,
      monthlyPayment: 481700,
      installmentMonths: 12,
      rating: 5,
      reviewsCount: 0,
      badge: 'СКИДКА',
      badgeType: 'discount',
      brand: 'Honor',
      memory: '8GB',
      processor: 'Snapdragon',
      inStock: true,
    },
    {
      id: 6,
      name: 'Смартфон Samsung Galaxy A17 6/128ГБ Black',
      images: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      ],
      currentImageIndex: 0,
      price: 2339000,
      monthlyPayment: 284600,
      installmentMonths: 12,
      rating: 5,
      reviewsCount: 0,
      badge: 'НОВИНКА',
      badgeType: 'new',
      brand: 'Samsung',
      memory: '6GB',
      processor: 'Exynos',
      inStock: true,
    },
  ];

  ngOnInit(): void {
    // Initialize component
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

  // Filter functions
  onFilterChange(filterId: string, optionId?: string): void {
    const filter = this.filters.find((f) => f.id === filterId);
    if (filter && filter.options && optionId) {
      const option = filter.options.find((o) => o.id === optionId);
      if (option) {
        option.checked = !option.checked;
        this.applyFilters();
      }
    }
  }

  onPriceRangeChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    // Implement filter logic here
    console.log('Applying filters...');
  }

  clearFilters(): void {
    this.filters.forEach((filter) => {
      if (filter.options) {
        filter.options.forEach((option) => (option.checked = false));
      }
      if (filter.type === 'range') {
        filter.currentMin = filter.min;
        filter.currentMax = filter.max;
      }
    });
    this.applyFilters();
  }

  // Product actions
  onBuyOneClick(product: Product): void {
    console.log('Buy one click:', product.name);
  }

  onAddToCart(product: Product): void {
    console.log('Add to cart:', product.name);
  }

  onAddToFavorites(product: Product): void {
    console.log('Add to favorites:', product.name);
  }

  onAddToCompare(product: Product): void {
    console.log('Add to compare:', product.name);
  }

  // Utility functions
  formatPrice(price: number): string {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  getStars(rating: number): boolean[] {
    return Array(5)
      .fill(false)
      .map((_, i) => i < rating);
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

  // Get count of checked options for filter
  getCheckedCount(filter: Filter): number {
    if (!filter.options) return 0;
    return filter.options.filter((option) => option.checked).length;
  }
}
