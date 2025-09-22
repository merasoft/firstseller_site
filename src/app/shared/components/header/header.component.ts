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
      title: 'Смартфонлар',
      link: '/catalog/smartphones',
      isActive: false,
    },
    {
      title: 'Маиший техника',
      link: '/catalog/appliances',
      isActive: false,
    },
    {
      title: 'Компьютерлар',
      link: '/catalog/computers',
      isActive: false,
    },
    {
      title: 'ТВ ва Аудио',
      link: '/catalog/tv-audio',
      isActive: false,
    },
    {
      title: 'Аксессуарлар',
      link: '/catalog/accessories',
      isActive: false,
    },
    {
      title: 'Чегирмалар',
      link: '/catalog/discounts',
      isActive: false,
      isSpecial: true,
    },
  ];

  // User actions
  userActions = [
    {
      icon: 'compare',
      title: 'Таққослаш',
      count: 0,
      link: '/compare',
    },
    {
      icon: 'heart',
      title: 'Истаклар',
      count: 1,
      link: '/favorites',
    },
    {
      icon: 'shopping-cart',
      title: 'Савдо',
      count: 3,
      link: '/cart',
    },
    {
      icon: 'user',
      title: 'Кабинет',
      count: 0,
      link: '/account',
    },
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

  onNavItemClick(event: any, item: any): void {
    if (item.action === 'catalog') {
      this.onCatalogToggle(event);
    } else if (item.link) {
      this.router.navigate([item.link]);
    }
  }

  onUserActionClick(action: any): void {
    this.router.navigate([action.link]);
  }

  onLogoClick(): void {
    this.router.navigate(['/']);
  }
}
