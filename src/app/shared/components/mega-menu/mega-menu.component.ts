import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Popover } from 'primeng/popover';

interface Subcategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  subcategories: Subcategory[];
}

interface CatalogData {
  categories: Category[];
}

interface FeaturedProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  categoryId: number;
}

@Component({
  selector: 'app-mega-menu',
  standalone: false,
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss'],
})
export class MegaMenuComponent implements OnInit {
  @ViewChild('menu') menu!: Popover;

  catalogData!: CatalogData;
  activeCategory: Category | null = null;
  featuredProducts: FeaturedProduct[] = [];
  isLoading = false;
  isMenuOpen = false;

  constructor(private router: Router) {}

  async loadCatalogData() {
    try {
      this.isLoading = true;

      const response = await fetch('/assets/data/catalog-menu.json');

      if (response.ok) {
        const data = await response.json();
        this.catalogData = data;
      } else {
        this.setFallbackData();
      }
    } catch (error) {
      this.setFallbackData();
    } finally {
      this.isLoading = false;
    }
  }

  setFallbackData() {
    this.catalogData = {
      categories: [
        {
          id: 1,
          name: 'Смартфонлар',
          slug: 'smartphones',
          icon: 'pi pi-mobile',
          subcategories: [
            { id: 11, name: 'Samsung Galaxy', slug: 'samsung', count: 45 },
            { id: 12, name: 'iPhone', slug: 'iphone', count: 23 },
            { id: 13, name: 'Honor', slug: 'honor', count: 34 },
            { id: 14, name: 'Xiaomi', slug: 'xiaomi', count: 28 },
          ],
        },
        {
          id: 2,
          name: 'Ноутбуклар',
          slug: 'laptops',
          icon: 'fa-solid fa-laptop',
          subcategories: [
            { id: 21, name: 'Gaming ноутбуклар', slug: 'gaming', count: 32 },
            { id: 22, name: 'Ишчи ноутбуклар', slug: 'business', count: 28 },
            { id: 23, name: 'MacBook', slug: 'macbook', count: 15 },
            { id: 24, name: 'Ультрабуклар', slug: 'ultrabooks', count: 21 },
          ],
        },
        {
          id: 3,
          name: 'Телевизорлар ва Мониторлар',
          slug: 'tv',
          icon: 'pi pi-desktop',
          subcategories: [
            { id: 41, name: 'Smart TV', slug: 'smart-tv', count: 25 },
            { id: 42, name: '4K UHD', slug: '4k', count: 18 },
            { id: 43, name: 'QLED', slug: 'qled', count: 22 },
            { id: 44, name: 'OLED', slug: 'oled', count: 16 },
          ],
        },
        {
          id: 4,
          name: 'Аудио',
          slug: 'audio',
          icon: 'pi pi-headphones',
          subcategories: [
            { id: 31, name: 'Наушниклар', slug: 'headphones', count: 45 },
            { id: 32, name: 'Колонкалар', slug: 'speakers', count: 38 },
            { id: 33, name: 'Soundbar', slug: 'soundbar', count: 23 },
            { id: 34, name: 'Микрофонлар', slug: 'microphones', count: 17 },
          ],
        },
        {
          id: 5,
          name: 'Аксессуарлар',
          slug: 'accessories',
          icon: 'pi pi-cog',
          subcategories: [
            { id: 51, name: 'Повербанклар', slug: 'powerbanks', count: 35 },
            { id: 52, name: 'Зарядлаш кабеллари', slug: 'cables', count: 42 },
            { id: 53, name: 'Чехоллар', slug: 'cases', count: 28 },
            { id: 54, name: 'Ҳолдерлар', slug: 'holders', count: 56 },
          ],
        },
      ],
    };

    if (this.catalogData.categories.length > 0) {
      this.activeCategory = this.catalogData.categories[0];
    }
  }

  setActiveCategory(category: Category) {
    this.activeCategory = category;
  }

  navigateToProduct(product: FeaturedProduct) {
    this.router.navigate(['/catalog/product', product.id]);
  }

  viewAllCategory(category: Category) {
    this.router.navigate(['/catalog', category.slug]);
  }

  toggleMenu(event: any) {
    this.menu.toggle(event);
    this.isMenuOpen = this.menu.overlayVisible;

    if (this.isMenuOpen && !this.catalogData) {
      this.loadCatalogData();
    }
  }

  onSubcategoryClick(subcategory: Subcategory) {
    this.router.navigate(['/catalog', this.activeCategory?.slug, subcategory.slug]);
  }

  onViewAllClick() {
    this.router.navigate(['/catalog', this.activeCategory?.slug]);
  }

  ngOnInit() {
    this.loadCatalogData();
  }
}
