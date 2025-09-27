// src/app/shared/components/header/header.component.ts
import { Component, HostListener, ViewChild, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { CompareService } from '../../services/compare.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('menu') menu: any;

  searchQuery: string = '';
  isMenuOpen = false;
  cartItemsCount = 0;
  wishlistItemsCount = 0;
  compareItemsCount = 0;

  constructor(private router: Router, private route: ActivatedRoute, private cartService: CartService, private wishlistService: WishlistService, private compareService: CompareService) {}

  ngOnInit(): void {
    // Subscribe to cart changes to update count
    this.cartService.cart$.subscribe((cart) => {
      this.cartItemsCount = cart.totalItems;
      // Update the cart action count
      const cartAction = this.userActions.find((action) => action.name === 'cart');
      if (cartAction) {
        cartAction.count = this.cartItemsCount;
      }
    });

    // Subscribe to wishlist changes to update count
    this.wishlistService.wishlist$.subscribe((wishlist) => {
      this.wishlistItemsCount = wishlist.totalItems;
      // Update the wishlist action count
      const wishlistAction = this.userActions.find((action) => action.name === 'wishlist');
      if (wishlistAction) {
        wishlistAction.count = this.wishlistItemsCount;
      }
    });

    // Subscribe to compare changes to update count
    this.compareService.compare$.subscribe((compareList) => {
      this.compareItemsCount = compareList.totalItems;
      // Update the compare action count
      const compareAction = this.userActions.find((action) => action.name === 'compare');
      if (compareAction) {
        compareAction.count = this.compareItemsCount;
      }
    });

    // Subscribe to router events to update active states
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.updateActiveStates();
    });

    // Initial update
    this.updateActiveStates();
  }

  private updateActiveStates(): void {
    const currentUrl = this.router.url;
    const urlTree = this.router.parseUrl(currentUrl);
    const queryParams = urlTree.queryParams;

    // Reset all active states
    this.navItems.forEach((item) => (item.isActive = false));

    // Set active state based on current route and query params
    if (currentUrl.includes('/catalog')) {
      const filterParam = queryParams['filter'];

      if (filterParam) {
        const activeItem = this.navItems.find((item) => {
          if (item.queryParams) {
            return item.queryParams['filter'] === filterParam;
          }
          return false;
        });
        if (activeItem) {
          activeItem.isActive = true;
        }
      }
    }
  }

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
      title: 'Хиты продаж',
      link: '/catalog',
      queryParams: { filter: 'hit' },
      isActive: false,
    },
    {
      title: 'Топ товары',
      link: '/catalog',
      queryParams: { filter: 'top' },
      isActive: false,
    },
    {
      title: 'Скидки',
      link: '/catalog',
      queryParams: { filter: 'discount' },
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
      url: 'fa-solid fa-scale-balanced',
      name: 'compare',
      title: 'Сравнить',
      count: 0,
      link: '/catalog/compare',
      main: true,
      hamburger: false,
      footer: false,
    },
    {
      type: 'icon',
      url: 'pi pi-credit-card',
      name: 'pay',
      title: 'Оплатить',
      count: 0,
      link: '/',
      main: true,
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
      main: true,
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
      url: 'pi pi-heart',
      name: 'wishlist',
      title: 'Избранное',
      count: 0,
      link: '/wishlist',
      main: true,
      hamburger: false,
      footer: true,
    },
    {
      type: 'icon',
      url: 'pi pi-shopping-bag',
      name: 'cart',
      title: 'Корзина',
      count: 0,
      link: '/catalog/cart',
      main: true,
      hamburger: false,
      footer: true,
    },
    {
      type: 'image',
      url: '/assets/images/flag_ru.png',
      name: 'lang',
      title: 'Русский',
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
      title: 'Личный кабинет',
      count: 0,
      link: '/account',
      main: true,
      hamburger: false,
      footer: true,
    },
  ];

  lang_list = [
    { code: 'uz', label: 'Узбекский', flag: 'flag_uz.png' },
    { code: 'ru', label: 'Русский', flag: 'flag_ru.png' },
    { code: 'en', label: 'Английский', flag: 'flag_en.png' },
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
      if (item.queryParams) {
        this.router.navigate([item.link], { queryParams: item.queryParams });
      } else {
        this.router.navigate([item.link]);
      }
    }
  }

  onUserActionClick(action: any): void {
    switch (action.name) {
      case 'catalog': {
        this.onCatalogDrawerToggle();
        break;
      }
      case 'cart': {
        this.cartService.openCartDrawer();
        break;
      }
      case 'wishlist': {
        this.router.navigate(['/wishlist']);
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
