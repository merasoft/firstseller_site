// src/app/shared/components/header/header.component.ts
import { Component, HostListener, ViewChild, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { CompareService } from '../../services/compare.service';
import { LanguageService, Language } from '../../services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('menu') menu: any;
  @ViewChild('languagePopover') languagePopover: any;

  searchQuery: string = '';
  isMenuOpen = false;
  cartItemsCount = 0;
  wishlistItemsCount = 0;
  compareItemsCount = 0;

  // Language properties
  currentLanguage: string = 'ru';
  languages: Language[] = [];
  isLanguagePopoverVisible: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private compareService: CompareService,
    private languageService: LanguageService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // Initialize languages
    this.languages = this.languageService.languages;
    this.languageService.currentLanguage$.subscribe((lang) => {
      this.currentLanguage = lang;
      this.updateTranslations();
    });

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

    // Set active state for publications page
    if (currentUrl.includes('/home/publications')) {
      const publicationsItem = this.navItems.find((item) => item.link === '/home/publications');
      if (publicationsItem) {
        publicationsItem.isActive = true;
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
    {
      title: 'Публикации',
      link: '/home/publications',
      isActive: false,
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
      title: 'Публикации',
      count: 0,
      link: '/home/publications',
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
    { code: 'uz', label: "O'zbekcha", flag: 'flag_uz.png' },
    { code: 'ru', label: 'Русский', flag: 'flag_ru.png' },
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
      if (item.queryParams) {
        this.router.navigate([item.link], { queryParams: item.queryParams });
      } else {
        this.router.navigate([item.link]);
      }
    }
  }

  onUserActionClick(action: any, event?: Event): void {
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
      case 'lang': {
        if (event && this.languagePopover) {
          this.languagePopover.toggle(event);
        }
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

  onLanguageSelect(language: Language): void {
    this.languageService.setLanguage(language.code);
    this.isLanguagePopoverVisible = false;
    this.languagePopover.hide();

    // Update the language action with the new flag and title
    const langAction = this.userActions.find((action) => action.name === 'lang');
    if (langAction) {
      langAction.url = `/assets/images/${language.flag}`;
      langAction.title = language.name;
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Language methods
  changeLanguage(languageCode: string): void {
    this.languageService.setLanguage(languageCode);
  }

  getCurrentLanguageData(): Language | undefined {
    return this.languageService.getCurrentLanguageData();
  }

  private updateTranslations(): void {
    // Update navigation items with translations
    this.translate.get(['HEADER.CATALOG', 'NAVIGATION.HIT_SALE', 'NAVIGATION.TOP_PRODUCTS', 'NAVIGATION.DEALS', 'NAVIGATION.PUBLICATIONS']).subscribe((translations) => {
      this.navItems[0].title = translations['HEADER.CATALOG'];
      this.navItems[1].title = translations['NAVIGATION.HIT_SALE'];
      this.navItems[2].title = translations['NAVIGATION.TOP_PRODUCTS'];
      this.navItems[3].title = translations['NAVIGATION.DEALS'];
      this.navItems[4].title = translations['NAVIGATION.PUBLICATIONS'];
    });

    // Update user actions with translations
    this.translate
      .get([
        'HEADER.HOME',
        'HEADER.CATALOG',
        'HEADER.CART',
        'HEADER.WISHLIST',
        'HEADER.COMPARE',
        'HEADER.PROFILE',
        'HEADER.PAY',
        'HEADER.TRACK_ORDER',
        'HEADER.NEW_PRODUCTS',
        'HEADER.NEWS',
        'HEADER.ABOUT',
      ])
      .subscribe((translations) => {
        const homeAction = this.userActions.find((action) => action.name === 'main');
        if (homeAction) homeAction.title = translations['HEADER.HOME'];

        const catalogAction = this.userActions.find((action) => action.name === 'catalog');
        if (catalogAction) catalogAction.title = translations['HEADER.CATALOG'];

        const cartAction = this.userActions.find((action) => action.name === 'cart');
        if (cartAction) cartAction.title = translations['HEADER.CART'];

        const wishlistAction = this.userActions.find((action) => action.name === 'wishlist');
        if (wishlistAction) wishlistAction.title = translations['HEADER.WISHLIST'];

        const compareAction = this.userActions.find((action) => action.name === 'compare');
        if (compareAction) compareAction.title = translations['HEADER.COMPARE'];

        const accountAction = this.userActions.find((action) => action.name === 'account');
        if (accountAction) accountAction.title = translations['HEADER.PROFILE'];

        const payAction = this.userActions.find((action) => action.name === 'pay');
        if (payAction) payAction.title = translations['HEADER.PAY'];

        const trackAction = this.userActions.find((action) => action.name === 'track');
        if (trackAction) trackAction.title = translations['HEADER.TRACK_ORDER'];

        const newProductsAction = this.userActions.find((action) => action.name === 'new_products');
        if (newProductsAction) newProductsAction.title = translations['HEADER.NEW_PRODUCTS'];

        const newsAction = this.userActions.find((action) => action.name === 'news');
        if (newsAction) newsAction.title = translations['HEADER.NEWS'];

        const aboutAction = this.userActions.find((action) => action.name === 'about');
        if (aboutAction) aboutAction.title = translations['HEADER.ABOUT'];
      });

    // Update language action with current language
    const currentLang = this.languages.find((lang) => lang.code === this.currentLanguage);
    if (currentLang) {
      const langAction = this.userActions.find((action) => action.name === 'lang');
      if (langAction) {
        langAction.url = `/assets/images/${currentLang.flag}`;
        langAction.title = currentLang.name;
      }
    }
  }
}
