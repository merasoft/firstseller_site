import { Component, OnInit } from '@angular/core';

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

@Component({
  selector: 'app-mega-menu',
  standalone: false,
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss']
})
export class MegaMenuComponent implements OnInit {
  catalogData: CatalogData | null = null;
  activeCategory: Category | null = null;
  isMenuOpen = false;
  isLoading = false;

  ngOnInit() {
    this.loadCatalogData();
  }

  async loadCatalogData() {
    try {
      this.isLoading = true;
      console.log('JSON файлини юклаш бошланди...');

      const response = await fetch('/assets/data/catalog-menu.json');
      console.log('Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Юкланган маълумотлар:', data);
        this.catalogData = data;
        console.log('Категориялар сони:', this.catalogData?.categories?.length);
      } else {
        console.error('JSON файл топилмади, test маълумотлар ишлатилмоқда');
        this.setFallbackData();
      }

      if (this.catalogData && this.catalogData.categories.length > 0) {
        this.activeCategory = this.catalogData.categories[0];
        console.log('Фаол категория:', this.activeCategory?.name);
      }

    } catch (error) {
      console.error('JSON юклашда хато:', error);
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
          name: "Смартфонлар",
          slug: "smartphones",
          icon: "smartphone",
          subcategories: [
            { id: 11, name: "Samsung Galaxy", slug: "samsung", count: 45 },
            { id: 12, name: "iPhone", slug: "iphone", count: 23 },
            { id: 13, name: "Honor", slug: "honor", count: 34 },
            { id: 14, name: "Xiaomi", slug: "xiaomi", count: 28 }
          ]
        },
        {
          id: 2,
          name: "Ноутбуклар",
          slug: "laptops",
          icon: "laptop",
          subcategories: [
            { id: 21, name: "Gaming ноутбуклар", slug: "gaming", count: 32 },
            { id: 22, name: "Ишчи ноутбуклар", slug: "business", count: 28 },
            { id: 23, name: "MacBook", slug: "macbook", count: 15 },
            { id: 24, name: "Ультрабуклар", slug: "ultrabooks", count: 21 }
          ]
        },
        {
          id: 3,
          name: "Телевизорлар",
          slug: "tv",
          icon: "tv",
          subcategories: [
            { id: 31, name: "Smart TV", slug: "smart-tv", count: 45 },
            { id: 32, name: "4K UHD", slug: "4k", count: 38 },
            { id: 33, name: "QLED", slug: "qled", count: 23 },
            { id: 34, name: "OLED", slug: "oled", count: 17 }
          ]
        },
        {
          id: 4,
          name: "Маиший техника",
          slug: "appliances",
          icon: "home",
          subcategories: [
            { id: 41, name: "Холодильниклар", slug: "fridges", count: 25 },
            { id: 42, name: "Кир ювиш машиналари", slug: "washing", count: 18 },
            { id: 43, name: "Пылесослар", slug: "vacuum", count: 22 },
            { id: 44, name: "Микротўлқинли печлар", slug: "microwave", count: 16 }
          ]
        },
        {
          id: 5,
          name: "Аксессуарлар",
          slug: "accessories",
          icon: "headphones",
          subcategories: [
            { id: 51, name: "Повербанклар", slug: "powerbanks", count: 35 },
            { id: 52, name: "Зарядлаш кабеллари", slug: "cables", count: 42 },
            { id: 53, name: "Наушниклар", slug: "headphones", count: 28 },
            { id: 54, name: "Чехоллар", slug: "cases", count: 56 }
          ]
        },
        {
          id: 6,
          name: "Ўйин консоллари",
          slug: "gaming",
          icon: "gamepad",
          subcategories: [
            { id: 61, name: "PlayStation 5", slug: "ps5", count: 8 },
            { id: 62, name: "Xbox Series", slug: "xbox", count: 6 },
            { id: 63, name: "Nintendo Switch", slug: "nintendo", count: 12 },
            { id: 64, name: "Gaming аксессуарлар", slug: "gaming-acc", count: 24 }
          ]
        }
      ]
    };

    if (this.catalogData.categories.length > 0) {
      this.activeCategory = this.catalogData.categories[0];
    }
  }

  setActiveCategory(category: Category) {
    this.activeCategory = category;
    console.log('Танланган категория:', category.name);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('Menu ҳолати:', this.isMenuOpen ? 'очиқ' : 'ёпиқ');

    if (this.isMenuOpen && !this.catalogData) {
      this.loadCatalogData();
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    console.log('Menu ёпилди');
  }

  onBackdropClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.closeMenu();
  }

  onSubcategoryClick(subcategory: Subcategory) {
    console.log('Танланган подкатегория:', subcategory.name);
    this.closeMenu();
    // Bu yerda routing qo'shishingiz mumkin
    // this.router.navigate(['/category', this.activeCategory?.slug, subcategory.slug]);
  }

  onViewAllClick() {
    console.log('Ҳаммасини кўриш:', this.activeCategory?.name);
    this.closeMenu();
    // Bu yerda routing qo'shishingiz mumkin
    // this.router.navigate(['/category', this.activeCategory?.slug]);
  }
}
