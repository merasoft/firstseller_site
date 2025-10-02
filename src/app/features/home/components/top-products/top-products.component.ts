import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { TranslateService } from '@ngx-translate/core';

interface TopProduct {
  id: number;
  name: string;
  images: string[];
  price: number;
  oldPrice?: number;
  monthlyPayment: number;
  installmentMonths: number;
  rating: number;
  reviewsCount: number;
  isTop?: boolean;
  badge?: string;
}

@Component({
  selector: 'app-top-products',
  standalone: false,
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.scss'],
})
export class TopProductsComponent implements OnInit {
  constructor(private translate: TranslateService) {}

  topProducts: TopProduct[] = [
    {
      id: 11,
      name: 'Смартфон Samsung Galaxy S25 Ultra 12/256GB Titanium Black',
      images: ['assets/images/products/samsung-s25-1.webp'],
      price: 15999000,
      oldPrice: 17999000,
      monthlyPayment: 1944000,
      installmentMonths: 12,
      rating: 5,
      reviewsCount: 15,
      isTop: true,
    },
    {
      id: 12,
      name: 'Телевизор Samsung QN55Q80C 55" 4K QLED Smart TV',
      images: ['assets/images/products/samsung-tv.webp'],
      price: 8999000,
      monthlyPayment: 1080000,
      installmentMonths: 12,
      rating: 5,
      reviewsCount: 12,
      isTop: true,
    },
    {
      id: 13,
      name: 'Пылесос Xiaomi Vacuum Cleaner G10 Plus',
      images: ['assets/images/products/xiaomi-vacuum.webp'],
      price: 2999000,
      monthlyPayment: 360000,
      installmentMonths: 12,
      rating: 4,
      reviewsCount: 8,
      isTop: true,
    },
    {
      id: 14,
      name: 'Smart TV LG OLED55C3PSA 55" 4K OLED WebOS',
      images: ['assets/images/products/smart-tv.webp'],
      price: 12999000,
      monthlyPayment: 1560000,
      installmentMonths: 12,
      rating: 5,
      reviewsCount: 20,
      isTop: true,
    },
    {
      id: 15,
      name: 'Смартфон Samsung Galaxy S25 12/512GB Titanium Gray',
      images: ['assets/images/products/samsung-s25-2.webp'],
      price: 13999000,
      monthlyPayment: 1680000,
      installmentMonths: 12,
      rating: 5,
      reviewsCount: 18,
      isTop: true,
    },
    {
      id: 16,
      name: 'Смартфон Xiaomi Redmi 14C 8/256GB Starlight Blue',
      images: ['assets/images/products/xiaomi-redmi14c.webp'],
      price: 1899000,
      monthlyPayment: 228000,
      installmentMonths: 12,
      rating: 4,
      reviewsCount: 25,
      isTop: true,
    },
    {
      id: 17,
      name: 'Смартфон Xiaomi Redmi 15C 6/128GB Ocean Blue',
      images: ['assets/images/products/xiaomi-redmi15c.webp'],
      price: 1599000,
      monthlyPayment: 192000,
      installmentMonths: 12,
      rating: 4,
      reviewsCount: 14,
      isTop: true,
    },
    {
      id: 18,
      name: 'Парогенератор Braun CareStyle Compact IS2056',
      images: ['assets/images/products/braun-shaver.webp'],
      price: 2899000,
      monthlyPayment: 348000,
      installmentMonths: 12,
      rating: 5,
      reviewsCount: 7,
      isTop: true,
    },
    {
      id: 19,
      name: 'Пылесос Dyson V12 Detect Slim Absolute',
      images: ['assets/images/products/dyson.webp'],
      price: 5999000,
      monthlyPayment: 720000,
      installmentMonths: 12,
      rating: 5,
      reviewsCount: 11,
      isTop: true,
    },
    {
      id: 20,
      name: 'Смартфон Apple iPhone 15 Pro 128GB Natural Titanium',
      images: ['assets/images/products/iphone.webp'],
      price: 12999000,
      monthlyPayment: 1560000,
      installmentMonths: 12,
      rating: 5,
      reviewsCount: 32,
      isTop: true,
    },
  ];

  // Convert TopProducts to shared Product interface - use a property instead of getter
  products: Product[] = [];

  ngOnInit(): void {
    this.products = this.topProducts.map((topProduct) => this.mapToProduct(topProduct));
  }

  // TrackBy function to help Angular track items efficiently
  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  private mapToProduct(topProduct: TopProduct): Product {
    return {
      id: topProduct.id,
      name: topProduct.name,
      images: topProduct.images,
      currentImageIndex: 0,
      price: topProduct.price,
      oldPrice: topProduct.oldPrice,
      monthlyPayment: topProduct.monthlyPayment,
      installmentMonths: topProduct.installmentMonths,
      rating: topProduct.rating,
      reviewsCount: topProduct.reviewsCount,
      badge: 'ТОП', // Always set badge to 'ТОП' for top products
      badgeType: 'top', // Always set badgeType to 'top'
      brand: '', // Default values for required fields
      ram: '',
      memory: '',
      processor: '',
      inStock: true,
      categoryId: 1, // Default to smartphones category
      category: 'Телефоны и гаджеты',
    };
  }
}
