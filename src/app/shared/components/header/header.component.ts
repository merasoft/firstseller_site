// src/app/shared/components/header/header.component.ts
import { Component, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild('menu') menu: any;

  searchQuery: string = '';
  isMenuOpen = false;

  constructor(private router: Router) {}

  // Navigation items
  navItems = [
    {
      title: 'Каталог товаров',
      icon: 'menu',
      hasDropdown: true,
      isActive: false,
      action: 'catalog',
    },
    {
      title: 'Хит продаж',
      link: '/catalog/computers',
      isActive: false,
    },
    {
      title: 'Топ продукты',
      link: '/catalog',
      isActive: false,
    },
    {
      title: 'Чегирмалар',
      link: '/catalog',
      isActive: false,
      isSpecial: true,
    },
  ];

  // User actions
  userActions = [
    {
      type: 'icon',
      url: 'pi pi-home',
      name: 'main',
      title: 'Главная',
      count: 0,
      link: '/',
      main: false,
      hamburger: false,
      footer: true,
    },
    {
      type: 'icon',
      url: 'pi pi-th-large',
      name: 'catalog',
      title: 'Каталог',
      count: 0,
      link: '/',
      main: false,
      hamburger: false,
      footer: true,
    },
    {
      type: 'icon',
      url: 'pi pi-credit-card',
      name: 'pay',
      title: 'Оплатить',
      count: 0,
      link: '/',
      main: false,
      hamburger: true,
      footer: false,
    },
    {
      type: 'icon',
      url: 'pi pi-truck',
      name: 'track',
      title: 'Отследить заказ',
      count: 0,
      link: '/',
      main: false,
      hamburger: true,
      footer: false,
    },
    {
      type: 'icon',
      url: 'pi pi-tags',
      name: 'new_products',
      title: 'Новинки',
      count: 0,
      link: '/',
      main: false,
      hamburger: true,
      footer: false,
    },
    {
      type: 'icon',
      url: 'pi pi-book',
      name: 'news',
      title: 'Новости',
      count: 0,
      link: '/',
      main: false,
      hamburger: true,
      footer: false,
    },
    {
      type: 'icon',
      url: 'pi pi-info-circle',
      name: 'about',
      title: 'О нас',
      count: 0,
      link: '/',
      main: false,
      hamburger: true,
      footer: false,
    },
    {
      type: 'icon',
      url: 'fa-solid fa-scale-balanced',
      name: 'compare',
      title: 'Таққослаш',
      count: 0,
      link: '/compare',
      main: true,
      hamburger: false,
      footer: false,
    },
    {
      type: 'icon',
      url: 'pi pi-heart',
      name: 'wishlist',
      title: 'Истаклар',
      count: 1,
      link: '/wishlist',
      main: true,
      hamburger: false,
      footer: true,
    },
    {
      type: 'icon',
      url: 'pi pi-shopping-bag',
      name: 'cart',
      title: 'Савдо',
      count: 13,
      link: '/cart',
      main: true,
      hamburger: false,
      footer: true,
    },
    {
      type: 'image',
      url: '/assets/images/flag_uz.png',
      name: 'lang',
      title: 'Узбекча',
      count: 0,
      link: null,
      main: true,
      hamburger: false,
      footer: false,
    },
    {
      type: 'icon',
      url: 'pi pi-user',
      name: 'account',
      title: 'Кабинет',
      count: 0,
      link: '/account',
      main: true,
      hamburger: false,
      footer: true,
    },
  ];

  lang_list = [
    { code: 'uz', label: 'Uzbek', flag: 'flag_uz.png' },
    { code: 'ru', label: 'Russian', flag: 'flag_ru.png' },
    { code: 'en', label: 'English', flag: 'flag_en.png' },
  ];

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/catalog'], {
        queryParams: { search: this.searchQuery },
      });
    }
  }

  onCatalogToggle(event: any): void {
    this.menu.toggleMenu(event);
  }
  onCatalogDrawerToggle() {
    this.menu.toggleDrawer();
  }

  onNavItemClick(event: any, item: any): void {
    if (item.action === 'catalog') {
      this.onCatalogToggle(event);
    } else if (item.link) {
      this.router.navigate([item.link]);
    }
  }

  onUserActionClick(action: any): void {
    switch (action.name) {
      case 'catalog': {
        this.onCatalogDrawerToggle();
        break;
      }
      default: {
        this.router.navigate([action.link]);
        break;
      }
    }
  }

  onLogoClick(): void {
    this.router.navigate(['/']);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
