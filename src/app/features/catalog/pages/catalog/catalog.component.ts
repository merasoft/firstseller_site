// src/app/features/catalog/pages/catalog/catalog.component.ts
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from 'primeng/api';
import { Product } from '../../../../shared/models/product.model';
import { combineLatest } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

interface Filter {
  id: string;
  name: string;
  type: 'range' | 'checkbox' | 'radio';
  options?: FilterOption[];
  min?: number;
  max?: number;
  currentMin?: number;
  currentMax?: number;
  range?: [number, number];
}

interface FilterOption {
  id: string;
  name: string;
  count: number;
  checked: boolean;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  count?: number;
  children?: Category[];
}

interface QuickFilter {
  id: string;
  name: string;
  type: 'brand' | 'memory' | 'processor' | 'category' | 'price';
  value: string | number;
}

@Component({
  selector: 'app-catalog',
  standalone: false,
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  pageTitle = '';
  totalProducts = 518;
  filtersOpen = false;
  mobileScreen = window.innerWidth <= 640;
  isLoading = false;

  // Route parameters
  categorySlug: string | null = null;
  subcategorySlug: string | null = null;
  leafSlug: string | null = null;
  filterType: string | null = null; // hit, top, discount

  // Category data
  categories: Category[] = [];
  currentCategory: Category | null = null;
  currentSubcategory: Category | null = null;
  currentLeaf: Category | null = null;

  // PrimeNG Breadcrumb
  breadcrumbItems: MenuItem[] = [];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  breadcrumbs: { name: string; url: string }[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private translate: TranslateService) {}

  // Filtering properties
  filteredProducts: Product[] = [];
  appliedFilters: { [key: string]: any } = {};
  selectedFilters: any = [];

  // Temporary filter state for mobile drawer
  tempFilters: Filter[] = [];
  originalFilters: Filter[] = [];
  mobileAccordionActiveValues: string[] = [];

  quickFilters: QuickFilter[] = [
    { id: 'samsung-galaxy', name: 'Samsung Galaxy', type: 'brand', value: 'Samsung' },
    { id: 'honor-phones', name: 'Honor', type: 'brand', value: 'Honor' },
    { id: 'apple-products', name: 'Apple', type: 'brand', value: 'Apple' },
    { id: 'high-memory', name: '12GB RAM', type: 'memory', value: '12GB' },
    { id: 'snapdragon', name: 'Snapdragon', type: 'processor', value: 'Snapdragon' },
    { id: 'laptops', name: 'Ноутбуки', type: 'category', value: 'Компьютерная техника' },
    { id: 'under-5m', name: 'До 5 млн', type: 'price', value: 5000000 },
    { id: 'premium', name: 'Премиум', type: 'price', value: 10000000 },
  ];

  activeQuickFilters: Set<string> = new Set();

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
      range: [569000, 52314918],
    },
    {
      id: 'brand',
      name: 'Бренд',
      type: 'checkbox',
      options: [
        { id: 'honor', name: 'Honor', count: 2, checked: false },
        { id: 'samsung', name: 'Samsung', count: 3, checked: false },
        { id: 'vivo', name: 'Vivo', count: 1, checked: false },
        { id: 'lenovo', name: 'Lenovo', count: 1, checked: false },
        { id: 'apple', name: 'Apple', count: 1, checked: false },
      ],
    },
    {
      id: 'memory',
      name: 'Оперативная память',
      type: 'checkbox',
      options: [
        { id: '6gb', name: '6GB', count: 1, checked: false },
        { id: '8gb', name: '8GB', count: 3, checked: false },
        { id: '12gb', name: '12GB', count: 3, checked: false },
        { id: '16gb', name: '16GB', count: 1, checked: false },
      ],
    },
    {
      id: 'processor',
      name: 'Процессор',
      type: 'checkbox',
      options: [
        { id: 'snapdragon', name: 'Snapdragon', count: 3, checked: false },
        { id: 'exynos', name: 'Exynos', count: 3, checked: false },
        { id: 'amd-ryzen', name: 'AMD Ryzen 5', count: 1, checked: false },
        { id: 'apple-m2', name: 'Apple M2', count: 1, checked: false },
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
      rating: 3.5,
      reviewsCount: 8,
      badge: 'СУПЕР ЦЕНА',
      badgeType: 'super-price',
      brand: 'Honor',
      ram: '8GB',
      memory: '256GB',
      processor: 'Snapdragon',
      inStock: true,
      categoryId: 1,
      category: 'Телефоны и гаджеты',
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
      rating: 4,
      reviewsCount: 49,
      badge: 'СУПЕР ЦЕНА',
      badgeType: 'super-price',
      brand: 'Samsung',
      ram: '12GB',
      memory: '256GB',
      processor: 'Exynos',
      inStock: true,
      categoryId: 1,
      category: 'Телефоны и гаджеты',
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
      rating: 4.8,
      reviewsCount: 8,
      badge: 'СКИДКА',
      badgeType: 'discount',
      brand: 'Samsung',
      ram: '12GB',
      memory: '256GB',
      processor: 'Exynos',
      inStock: true,
      categoryId: 1,
      category: 'Телефоны и гаджеты',
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
      reviewsCount: 23,
      badge: 'СУПЕР ЦЕНА',
      badgeType: 'super-price',
      brand: 'Vivo',
      ram: '12GB',
      memory: '256GB',
      processor: 'Snapdragon',
      inStock: true,
      categoryId: 1,
      category: 'Телефоны и гаджеты',
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
      rating: 3.7,
      reviewsCount: 85,
      badge: 'СКИДКА',
      badgeType: 'discount',
      brand: 'Honor',
      ram: '8GB',
      memory: '256GB',
      processor: 'Snapdragon',
      inStock: true,
      categoryId: 1,
      category: 'Телефоны и гаджеты',
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
      reviewsCount: 126,
      badge: 'НОВИНКА',
      badgeType: 'new',
      brand: 'Samsung',
      ram: '6GB',
      memory: '128GB',
      processor: 'Exynos',
      inStock: true,
      categoryId: 1,
      category: 'Телефоны и гаджеты',
    },
    {
      id: 7,
      name: 'Ноутбук Lenovo IdeaPad Gaming 3 15.6" FHD',
      images: [
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1504707748692-419802cf939d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      ],
      currentImageIndex: 0,
      price: 8500000,
      oldPrice: 9200000,
      monthlyPayment: 1034000,
      installmentMonths: 12,
      rating: 4.5,
      reviewsCount: 42,
      badge: 'СКИДКА',
      badgeType: 'discount',
      brand: 'Lenovo',
      ram: '16GB',
      memory: '512GB',
      processor: 'AMD Ryzen 5',
      inStock: true,
      categoryId: 2,
      category: 'Компьютерная техника',
    },
    {
      id: 8,
      name: 'MacBook Air M2 13.6" 8GB/256GB Space Gray',
      images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1504707748692-419802cf939d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      ],
      currentImageIndex: 0,
      price: 15990000,
      monthlyPayment: 1945000,
      installmentMonths: 12,
      rating: 4.9,
      reviewsCount: 156,
      badge: 'ТОП',
      badgeType: 'top',
      brand: 'Apple',
      ram: '8GB',
      memory: '256GB',
      processor: 'Apple M2',
      inStock: true,
      categoryId: 2,
      category: 'Компьютерная техника',
    },
  ];

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth <= 640 && !this.mobileScreen) {
      this.mobileScreen = true;
    }
  }

  // Filter functions
  onFilterChange(filterId: string, optionId?: string): void {
    this.filters = this.filters.map((f) => {
      if (f.id === filterId && f.type === 'checkbox' && optionId) {
        const options = f.options?.map((o) => {
          if (o.id === optionId) {
            return { ...o, checked: !o.checked };
          }
          return o;
        });
        return { ...f, options };
      }
      return f;
    });
  }

  onPriceRangeChange(event: any): void {
    if (event == null || typeof event === 'number') {
      this.filters[0].range = [this.filters[0].currentMin!, this.filters[0].currentMax!];
    } else if (typeof event === 'object' && Array.isArray(event.values) && event.values.length === 2) {
      this.filters[0].currentMin = event.values[0];
      this.filters[0].currentMax = event.values[1];
    }

    this.applyFilters();
  }

  applyFilters(): void {
    // Start with all products
    let filtered = [...this.products];

    // Apply special filter types first
    if (this.filterType) {
      switch (this.filterType) {
        case 'hit':
          // Filter for hit products (products with high rating or have badges)
          filtered = filtered.filter((product) => product.rating >= 4.5 || product.badge || product.badgeType);
          break;
        case 'top':
          // Filter for top products (only products with 'top' badge)
          filtered = filtered.filter((product) => product.badgeType === 'top');
          break;
        case 'discount':
          // Filter for discounted products (have oldPrice or discount badge)
          filtered = filtered.filter((product) => product.oldPrice || product.badgeType === 'discount' || product.badgeType === 'super-price');
          break;
      }
    }

    // Apply price filter
    const priceFilter = this.filters.find((f) => f.id === 'price');
    if (priceFilter && priceFilter.currentMin !== undefined && priceFilter.currentMax !== undefined) {
      filtered = filtered.filter((product) => product.price >= priceFilter.currentMin! && product.price <= priceFilter.currentMax!);
    }

    // Apply brand filter
    const brandFilter = this.filters.find((f) => f.id === 'brand');
    if (brandFilter && brandFilter.options) {
      const selectedBrands = brandFilter.options.filter((option) => option.checked).map((option) => option.name);
      if (selectedBrands.length > 0) {
        filtered = filtered.filter((product) => selectedBrands.includes(product.brand));
      }
    }

    // Apply memory filter
    const memoryFilter = this.filters.find((f) => f.id === 'memory');
    if (memoryFilter && memoryFilter.options) {
      const selectedMemories = memoryFilter.options.filter((option) => option.checked).map((option) => option.name);
      if (selectedMemories.length > 0) {
        filtered = filtered.filter((product) => selectedMemories.includes(product.memory));
      }
    }

    // Apply processor filter
    const processorFilter = this.filters.find((f) => f.id === 'processor');
    if (processorFilter && processorFilter.options) {
      const selectedProcessors = processorFilter.options.filter((option) => option.checked).map((option) => option.name);
      if (selectedProcessors.length > 0) {
        filtered = filtered.filter((product) => product.processor && selectedProcessors.includes(product.processor));
      }
    }

    // Apply category quick filters
    const activeCategories = Array.from(this.activeQuickFilters)
      .map((id) => this.quickFilters.find((qf) => qf.id === id))
      .filter((qf) => qf && qf.type === 'category')
      .map((qf) => qf!.value);

    if (activeCategories.length > 0) {
      filtered = filtered.filter((product) => product.category && activeCategories.includes(product.category));
    }

    // Apply sorting
    this.filteredProducts = this.applySorting(filtered);

    // Update product count
    this.totalProducts = this.filteredProducts.length;

    // Update applied filters for tag display
    this.updateAppliedFilters();
  }

  clearFilters(): void {
    this.filters.forEach((filter) => {
      if (filter.options) {
        filter.options.forEach((option) => (option.checked = false));
      }
      if (filter.type === 'range') {
        filter.currentMin = filter.min;
        filter.currentMax = filter.max;
        filter.range = [filter.min!, filter.max!];
      }
    });
    this.selectedFilters = [];
    this.activeQuickFilters.clear();
    this.applyFilters();
  }

  applySorting(products: Product[]): Product[] {
    const sorted = [...products];

    switch (this.selectedSort) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'new':
        return sorted.sort((a, b) => b.id - a.id); // Assuming higher ID means newer
      case 'popular':
      default:
        return sorted.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }
  }

  updateAppliedFilters(): void {
    this.selectedFilters = [];

    this.filters.forEach((filter) => {
      if (filter.type === 'checkbox' && filter.options) {
        const checkedOptions = filter.options.filter((option) => option.checked);
        if (checkedOptions.length > 0) {
          this.selectedFilters.push({
            filter_id: filter.id,
            name: filter.name,
            values: checkedOptions.map((option) => option.name),
          });
        }
      }

      if ((filter.type === 'range' && filter.currentMin !== filter.min) || filter.currentMax !== filter.max) {
        this.selectedFilters.push({
          filter_id: filter.id,
          name: filter.name,
          values: [`${filter.currentMin?.toLocaleString()} - ${filter.currentMax?.toLocaleString()} сум`],
        });
      }
    });
  }

  // Get count of checked options for filter
  getCheckedCount(filter: Filter): number {
    if (!filter.options) return 0;
    return filter.options.filter((option) => option.checked).length;
  }

  onFilterOptionChange(filter: Filter, option: FilterOption): void {
    option.checked = !option.checked;
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  removeSelectedFilter(filterToRemove: any, valueToRemove?: string): void {
    const filter = this.filters.find((f) => f.id === filterToRemove.filter_id);
    if (!filter) return;

    if (filter.type === 'checkbox' && filter.options) {
      if (valueToRemove) {
        // Remove specific value
        const option = filter.options.find((opt) => opt.name === valueToRemove);
        if (option) option.checked = false;
      } else {
        // Remove all values for this filter
        filter.options.forEach((opt) => (opt.checked = false));
      }
    } else if (filter.type === 'range') {
      filter.currentMin = filter.min;
      filter.currentMax = filter.max;
      filter.range = [filter.min!, filter.max!];
    }

    this.applyFilters();
  }

  get subcategories(): Category[] {
    if (!this.currentCategory) return [];

    // If we're at the main category level, show subcategories
    if (!this.subcategorySlug) {
      return this.currentCategory.children || [];
    }

    // If we're in a subcategory but not in a leaf, show the leaf categories
    if (this.currentSubcategory && !this.leafSlug) {
      return this.currentSubcategory.children || [];
    }

    return [];
  }

  getSubcategoryLink(subcategory: Category): string[] {
    if (!this.currentCategory) return ['/catalog'];

    // If we're at the main category level, link to subcategory
    if (!this.subcategorySlug) {
      return ['/catalog', this.currentCategory.slug, subcategory.slug];
    }

    // If we're in a subcategory, link to leaf category
    if (this.currentSubcategory) {
      return ['/catalog', this.currentCategory.slug, this.currentSubcategory.slug, subcategory.slug];
    }

    return ['/catalog', this.currentCategory.slug, subcategory.slug];
  }

  isActiveSubcategory(subcategory: Category): boolean {
    // If we're at the main category level, check if this is the active subcategory
    if (!this.subcategorySlug) {
      return false; // No active subcategory yet
    }

    // If we're in a subcategory, check if this is the active leaf
    if (this.currentSubcategory && !this.leafSlug) {
      return subcategory.slug === this.subcategorySlug;
    }

    // If we're in a leaf, check if this is the active leaf
    if (this.leafSlug) {
      return subcategory.slug === this.leafSlug;
    }

    return subcategory.slug === this.subcategorySlug;
  }

  applyQuickFilter(quickFilter: QuickFilter): void {
    // Toggle the quick filter
    if (this.activeQuickFilters.has(quickFilter.id)) {
      this.activeQuickFilters.delete(quickFilter.id);
      this.removeQuickFilterFromFilters(quickFilter);
    } else {
      this.activeQuickFilters.add(quickFilter.id);
      this.addQuickFilterToFilters(quickFilter);
    }

    this.applyFilters();
  }

  private addQuickFilterToFilters(quickFilter: QuickFilter): void {
    const filter = this.filters.find((f) => f.id === quickFilter.type);

    if (filter && filter.type === 'checkbox' && filter.options) {
      const option = filter.options.find((opt) => opt.name === quickFilter.value);
      if (option) {
        option.checked = true;
      }
    } else if (quickFilter.type === 'price' && typeof quickFilter.value === 'number') {
      const priceFilter = this.filters.find((f) => f.id === 'price');
      if (priceFilter) {
        if (quickFilter.id === 'under-5m') {
          priceFilter.currentMax = quickFilter.value;
        } else if (quickFilter.id === 'premium') {
          priceFilter.currentMin = quickFilter.value;
        }
        priceFilter.range = [priceFilter.currentMin!, priceFilter.currentMax!];
      }
    } else if (quickFilter.type === 'category') {
      // For category quick filter, we'll filter products directly in applyFilters method
    }
  }

  private removeQuickFilterFromFilters(quickFilter: QuickFilter): void {
    const filter = this.filters.find((f) => f.id === quickFilter.type);

    if (filter && filter.type === 'checkbox' && filter.options) {
      const option = filter.options.find((opt) => opt.name === quickFilter.value);
      if (option) {
        option.checked = false;
      }
    } else if (quickFilter.type === 'price') {
      const priceFilter = this.filters.find((f) => f.id === 'price');
      if (priceFilter) {
        priceFilter.currentMin = priceFilter.min;
        priceFilter.currentMax = priceFilter.max;
        priceFilter.range = [priceFilter.min!, priceFilter.max!];
      }
    }
  }

  isQuickFilterActive(quickFilter: QuickFilter): boolean {
    return this.activeQuickFilters.has(quickFilter.id);
  }

  onMobileFilterOpen(): void {
    // Store current filter state as backup
    this.originalFilters = JSON.parse(JSON.stringify(this.filters));
    // Create temporary filters for mobile drawer
    this.tempFilters = JSON.parse(JSON.stringify(this.filters));
    // Initialize mobile accordion with all panels open
    this.mobileAccordionActiveValues = this.getDefaultAccordionValues();
  }

  onMobileFilterCancel(): void {
    // Restore original filter state
    this.filters = JSON.parse(JSON.stringify(this.originalFilters));
    this.filtersOpen = false;
  }

  onMobileFilterApply(): void {
    // Apply the temporary filter changes
    this.filters = JSON.parse(JSON.stringify(this.tempFilters));
    this.applyFilters();
    this.filtersOpen = false;
  }

  onTempFilterOptionChange(filter: Filter, option: FilterOption): void {
    // Update temporary filter state without applying
    const tempFilter = this.tempFilters.find((f) => f.id === filter.id);
    if (tempFilter && tempFilter.options) {
      const tempOption = tempFilter.options.find((opt) => opt.id === option.id);
      if (tempOption) {
        tempOption.checked = !tempOption.checked;
      }
    }
  }

  onTempPriceRangeChange(event: any): void {
    const tempPriceFilter = this.tempFilters[0]; // Price is always first filter
    if (event == null || typeof event === 'number') {
      tempPriceFilter.range = [tempPriceFilter.currentMin!, tempPriceFilter.currentMax!];
    } else if (typeof event === 'object' && Array.isArray(event.values) && event.values.length === 2) {
      tempPriceFilter.currentMin = event.values[0];
      tempPriceFilter.currentMax = event.values[1];
    }
  }

  getTempFilterCheckedCount(filter: Filter): number {
    if (!filter.options) return 0;
    return filter.options.filter((option) => option.checked).length;
  }

  getDefaultAccordionValues(): string[] {
    const values = ['price', 'brand', 'memory', 'processor'];
    if (this.subcategories.length > 0) {
      values.unshift('categories'); // Add categories at the beginning
    }
    return values;
  }
  ngOnInit(): void {
    this.pageTitle = this.translate.instant('CATALOG.PAGE_TITLE'); // Initialize immediately
    this.initializeTranslations();
    this.subscribeToLanguageChanges();
    this.loadCategories();
    this.subscribeToRouteAndQueryParams();
    this.applyFilters(); // Initialize filtered products
    this.mobileAccordionActiveValues = this.getDefaultAccordionValues();
  }

  private loadCategories(): void {
    this.http.get<{ categories: Category[] }>('/assets/data/catalog-menu.json').subscribe({
      next: (data) => {
        this.categories = data.categories;
        this.updatePageContent();
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.setDefaultContent();
      },
    });
  }

  private subscribeToRouteAndQueryParams(): void {
    combineLatest([this.route.params, this.route.queryParams]).subscribe(([params, queryParams]) => {
      // Show loading indicator for navigation changes
      this.isLoading = true;

      // Update route parameters
      this.categorySlug = params['category'] || null;
      this.subcategorySlug = params['subcategory'] || null;
      this.leafSlug = params['leaf'] || null;

      // Update filter type from query params
      this.filterType = queryParams['filter'] || null;

      // Brief delay to show loading state, then update content
      setTimeout(() => {
        this.updatePageContent();
        this.updatePageTitle();
        this.updateBreadcrumbs();
        this.applyFilters();
        this.isLoading = false;
      }, 300);
    });
  }

  private updatePageContent(): void {
    if (!this.categories.length) return;

    if (this.categorySlug) {
      this.findCurrentCategory();
    } else if (!this.filterType) {
      // Only set default content if we don't have a special filter type
      this.setDefaultContent();
    }
  }

  private findCurrentCategory(): void {
    this.currentCategory = this.categories.find((cat) => cat.slug === this.categorySlug) || null;
    this.currentSubcategory = null;
    this.currentLeaf = null;

    if (this.currentCategory && this.subcategorySlug) {
      this.currentSubcategory = this.currentCategory.children?.find((sub) => sub.slug === this.subcategorySlug) || null;

      if (this.currentSubcategory && this.leafSlug) {
        // Third level - find leaf in subcategory's children
        this.currentLeaf = this.currentSubcategory.children?.find((leaf) => leaf.slug === this.leafSlug) || null;
      }
    }
  }

  private updatePageTitle(): void {
    // Check for special filter types first
    if (this.filterType) {
      switch (this.filterType) {
        case 'hit':
          this.pageTitle = this.translate.instant('CATALOG.BREADCRUMBS.HIT_PRODUCTS');
          break;
        case 'top':
          this.pageTitle = this.translate.instant('CATALOG.BREADCRUMBS.TOP_PRODUCTS');
          break;
        case 'discount':
          this.pageTitle = this.translate.instant('CATALOG.BREADCRUMBS.DISCOUNTS');
          break;
        default:
          this.setDefaultContent();
          return;
      }
      // Count will be updated after filtering
      return;
    }

    if (this.currentLeaf) {
      this.pageTitle = this.currentLeaf.name;
      this.totalProducts = this.currentLeaf.count || 0;
    } else if (this.currentSubcategory) {
      this.pageTitle = this.currentSubcategory.name;
      this.totalProducts = this.currentSubcategory.count || 0;
    } else if (this.currentCategory) {
      this.pageTitle = this.currentCategory.name;
      this.totalProducts = this.currentCategory.count || 0;
    } else {
      this.setDefaultContent();
    }
  }

  private updateBreadcrumbs(): void {
    this.breadcrumbs = [{ name: 'Главная', url: '/' }];
    this.breadcrumbItems = [];

    // Handle special filter types
    if (this.filterType) {
      let filterName = '';
      switch (this.filterType) {
        case 'hit':
          filterName = this.translate.instant('CATALOG.BREADCRUMBS.HIT_PRODUCTS');
          break;
        case 'top':
          filterName = this.translate.instant('CATALOG.BREADCRUMBS.TOP_PRODUCTS');
          break;
        case 'discount':
          filterName = this.translate.instant('CATALOG.BREADCRUMBS.DISCOUNTS');
          break;
      }
      if (filterName) {
        this.breadcrumbItems.push({ label: filterName });
      }
      return;
    }

    if (this.currentCategory) {
      const categoryUrl = `/catalog/${this.currentCategory.slug}`;
      this.breadcrumbItems.push({ label: this.currentCategory.name, routerLink: categoryUrl });

      if (this.currentSubcategory) {
        const subcategoryUrl = `${categoryUrl}/${this.currentSubcategory.slug}`;
        this.breadcrumbItems.push({ label: this.currentSubcategory.name, routerLink: subcategoryUrl });

        if (this.currentLeaf) {
          // Three levels: Category > Subcategory > Leaf
          this.breadcrumbItems.push({ label: this.currentLeaf.name });
        } else {
          // Two levels: Category > Subcategory (remove link from last item)
          this.breadcrumbItems[this.breadcrumbItems.length - 1] = { label: this.currentSubcategory.name };
        }
      } else {
        // One level: Category only (remove link from last item)
        this.breadcrumbItems[this.breadcrumbItems.length - 1] = { label: this.currentCategory.name };
      }
    }
  }

  private setDefaultContent(): void {
    this.pageTitle = this.translate.instant('CATALOG.PAGE_TITLE');
    this.totalProducts = 518;
    this.breadcrumbs = [{ name: 'Главная', url: '/' }];
    this.breadcrumbItems = [];
  }

  private initializeTranslations(): void {
    // Update page title
    this.pageTitle = this.translate.instant('CATALOG.PAGE_TITLE');

    // Update sort options
    this.sortOptions = [
      { value: 'popular', label: this.translate.instant('CATALOG.SORT.BY_POPULARITY') },
      { value: 'price-asc', label: this.translate.instant('CATALOG.SORT.BY_PRICE_ASC') },
      { value: 'price-desc', label: this.translate.instant('CATALOG.SORT.BY_PRICE_DESC') },
      { value: 'rating', label: this.translate.instant('CATALOG.SORT.BY_RATING') },
      { value: 'new', label: this.translate.instant('CATALOG.SORT.BY_NEW') },
    ];

    // Update filter names
    this.filters = this.filters.map((filter) => ({
      ...filter,
      name: this.getFilterName(filter.id),
    }));

    // Update quick filters (only for price-related filters, keep original names for categories/brands)
    this.quickFilters = this.quickFilters.map((filter) => ({
      ...filter,
      name: this.shouldTranslateQuickFilter(filter.type) ? this.getQuickFilterName(filter.id) : this.getOriginalQuickFilterName(filter.id),
    }));
  }

  private getFilterName(filterId: string): string {
    switch (filterId) {
      case 'price':
        return this.translate.instant('CATALOG.PRICE_FILTER');
      case 'brand':
        return this.translate.instant('CATALOG.BRAND_FILTER');
      case 'memory':
        return this.translate.instant('CATALOG.MEMORY_FILTER');
      case 'processor':
        return this.translate.instant('CATALOG.PROCESSOR_FILTER');
      default:
        return filterId;
    }
  }

  private getQuickFilterName(filterId: string): string {
    switch (filterId) {
      case 'under-5m':
        return this.translate.instant('CATALOG.QUICK_FILTERS.UNDER_5M');
      case 'premium':
        return this.translate.instant('CATALOG.QUICK_FILTERS.PREMIUM');
      default:
        return filterId; // Keep original names for categories, brands, etc.
    }
  }

  private shouldTranslateQuickFilter(filterType: string): boolean {
    // Only translate price filters, keep original names for categories, brands, memory, processor
    return filterType === 'price';
  }

  private getOriginalQuickFilterName(filterId: string): string {
    // Return original hardcoded names for categories, brands, etc.
    switch (filterId) {
      case 'samsung-galaxy':
        return 'Samsung Galaxy';
      case 'honor-phones':
        return 'Honor';
      case 'apple-products':
        return 'Apple';
      case 'high-memory':
        return '12GB RAM';
      case 'snapdragon':
        return 'Snapdragon';
      case 'laptops':
        return 'Ноутбуки';
      default:
        return filterId;
    }
  }

  private subscribeToLanguageChanges(): void {
    this.translate.onLangChange.subscribe(() => {
      this.initializeTranslations();
      // Update current page title and breadcrumbs with new language
      this.updatePageTitle();
      this.updateBreadcrumbs();
    });
  }
}
