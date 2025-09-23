import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Popover } from 'primeng/popover';

interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  count: number;
  children: Category[];
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
        if (this.catalogData.categories.length > 0) {
          this.activeCategory = this.catalogData.categories[0];
        }
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
          count: 130,
          children: [
            {
              id: 11,
              name: 'Samsung Galaxy',
              slug: 'samsung',
              count: 45,
              children: [
                { id: 111, name: 'Galaxy S Series', slug: 's-series', count: 20, children: [] },
                { id: 112, name: 'Galaxy A Series', slug: 'a-series', count: 15, children: [] },
                { id: 113, name: 'Galaxy Note Series', slug: 'note-series', count: 10, children: [] },
              ],
            },
            {
              id: 12,
              name: 'iPhone',
              slug: 'iphone',
              count: 23,
              children: [
                { id: 121, name: 'iPhone 14', slug: 'iphone-14', count: 8, children: [] },
                { id: 122, name: 'iPhone 13', slug: 'iphone-13', count: 7, children: [] },
                { id: 123, name: 'iPhone SE', slug: 'iphone-se', count: 8, children: [] },
              ],
            },
            {
              id: 13,
              name: 'Honor',
              slug: 'honor',
              count: 34,
              children: [
                { id: 131, name: 'Honor X Series', slug: 'x-series', count: 14, children: [] },
                { id: 132, name: 'Honor Magic Series', slug: 'magic-series', count: 20, children: [] },
              ],
            },
            {
              id: 14,
              name: 'Xiaomi',
              slug: 'xiaomi',
              count: 28,
              children: [
                { id: 141, name: 'Redmi', slug: 'redmi', count: 18, children: [] },
                { id: 142, name: 'Mi', slug: 'mi', count: 10, children: [] },
              ],
            },
          ],
        },
        {
          id: 2,
          name: 'Ноутбуклар',
          slug: 'laptops',
          icon: 'fa-solid fa-laptop',
          count: 96,
          children: [
            {
              id: 21,
              name: 'Gaming ноутбуклар',
              slug: 'gaming',
              count: 32,
              children: [
                { id: 211, name: 'Asus ROG', slug: 'asus-rog', count: 12, children: [] },
                { id: 212, name: 'MSI Gaming', slug: 'msi-gaming', count: 10, children: [] },
                { id: 213, name: 'Acer Predator', slug: 'acer-predator', count: 10, children: [] },
              ],
            },
            {
              id: 22,
              name: 'Ишчи ноутбуклар',
              slug: 'business',
              count: 28,
              children: [
                { id: 221, name: 'Dell Latitude', slug: 'dell-latitude', count: 14, children: [] },
                { id: 222, name: 'HP ProBook', slug: 'hp-probook', count: 14, children: [] },
              ],
            },
            {
              id: 23,
              name: 'MacBook',
              slug: 'macbook',
              count: 15,
              children: [
                { id: 231, name: 'MacBook Air', slug: 'macbook-air', count: 7, children: [] },
                { id: 232, name: 'MacBook Pro', slug: 'macbook-pro', count: 8, children: [] },
              ],
            },
            {
              id: 24,
              name: 'Ультрабуклар',
              slug: 'ultrabooks',
              count: 21,
              children: [
                { id: 241, name: 'Lenovo Yoga', slug: 'lenovo-yoga', count: 11, children: [] },
                { id: 242, name: 'HP Spectre', slug: 'hp-spectre', count: 10, children: [] },
              ],
            },
          ],
        },
        {
          id: 3,
          name: 'Телевизорлар ва Мониторлар',
          slug: 'tv',
          icon: 'pi pi-desktop',
          count: 81,
          children: [
            {
              id: 41,
              name: 'Smart TV',
              slug: 'smart-tv',
              count: 25,
              children: [
                { id: 411, name: 'Samsung Smart TV', slug: 'samsung-smart', count: 10, children: [] },
                { id: 412, name: 'LG Smart TV', slug: 'lg-smart', count: 15, children: [] },
              ],
            },
            {
              id: 42,
              name: '4K UHD',
              slug: '4k',
              count: 18,
              children: [
                { id: 421, name: 'Sony 4K', slug: 'sony-4k', count: 8, children: [] },
                { id: 422, name: 'Philips 4K', slug: 'philips-4k', count: 10, children: [] },
              ],
            },
            {
              id: 43,
              name: 'QLED',
              slug: 'qled',
              count: 22,
              children: [
                { id: 431, name: 'Samsung QLED', slug: 'samsung-qled', count: 12, children: [] },
                { id: 432, name: 'TCL QLED', slug: 'tcl-qled', count: 10, children: [] },
              ],
            },
            {
              id: 44,
              name: 'OLED',
              slug: 'oled',
              count: 16,
              children: [
                { id: 441, name: 'LG OLED', slug: 'lg-oled', count: 8, children: [] },
                { id: 442, name: 'Sony OLED', slug: 'sony-oled', count: 8, children: [] },
              ],
            },
          ],
        },
        {
          id: 4,
          name: 'Аудио',
          slug: 'audio',
          icon: 'pi pi-headphones',
          count: 123,
          children: [
            {
              id: 31,
              name: 'Наушниклар',
              slug: 'headphones',
              count: 45,
              children: [
                { id: 311, name: 'Wireless', slug: 'wireless', count: 25, children: [] },
                { id: 312, name: 'Wired', slug: 'wired', count: 20, children: [] },
              ],
            },
            {
              id: 32,
              name: 'Колонкалар',
              slug: 'speakers',
              count: 38,
              children: [
                { id: 321, name: 'Bluetooth', slug: 'bluetooth', count: 18, children: [] },
                { id: 322, name: 'Portable', slug: 'portable', count: 20, children: [] },
              ],
            },
            {
              id: 33,
              name: 'Soundbar',
              slug: 'soundbar',
              count: 23,
              children: [
                { id: 331, name: 'Samsung Soundbar', slug: 'samsung-soundbar', count: 12, children: [] },
                { id: 332, name: 'LG Soundbar', slug: 'lg-soundbar', count: 11, children: [] },
              ],
            },
            {
              id: 34,
              name: 'Микрофонлар',
              slug: 'microphones',
              count: 17,
              children: [
                { id: 341, name: 'USB', slug: 'usb', count: 9, children: [] },
                { id: 342, name: 'Studio', slug: 'studio', count: 8, children: [] },
              ],
            },
          ],
        },
        {
          id: 5,
          name: 'Аксессуарлар',
          slug: 'accessories',
          icon: 'pi pi-cog',
          count: 161,
          children: [
            {
              id: 51,
              name: 'Повербанклар',
              slug: 'powerbanks',
              count: 35,
              children: [
                { id: 511, name: '10,000mAh', slug: '10000mah', count: 20, children: [] },
                { id: 512, name: '20,000mAh', slug: '20000mah', count: 15, children: [] },
              ],
            },
            {
              id: 52,
              name: 'Зарядлаш кабеллари',
              slug: 'cables',
              count: 42,
              children: [
                { id: 521, name: 'USB-C', slug: 'usb-c', count: 22, children: [] },
                { id: 522, name: 'Lightning', slug: 'lightning', count: 20, children: [] },
              ],
            },
            {
              id: 53,
              name: 'Чехоллар',
              slug: 'cases',
              count: 28,
              children: [
                { id: 531, name: 'iPhone Cases', slug: 'iphone-cases', count: 14, children: [] },
                { id: 532, name: 'Samsung Cases', slug: 'samsung-cases', count: 14, children: [] },
              ],
            },
            {
              id: 54,
              name: 'Ҳолдерлар',
              slug: 'holders',
              count: 56,
              children: [
                { id: 541, name: 'Car Holders', slug: 'car-holders', count: 28, children: [] },
                { id: 542, name: 'Desk Holders', slug: 'desk-holders', count: 28, children: [] },
              ],
            },
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

  toggleMenu(event: any) {
    this.menu.toggle(event);
    this.isMenuOpen = this.menu.overlayVisible;

    if (this.isMenuOpen && !this.catalogData) {
      this.loadCatalogData();
    }
  }

  onSubcategoryClick(subcategory: Category) {
    this.router.navigate(['/catalog', this.activeCategory?.slug, subcategory.slug]);
  }

  ngOnInit() {
    this.loadCatalogData();
  }
}
