import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';

interface HitProduct {
  id: number;
  name: string;
  image: string;
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
  selector: 'app-hit-products',
  standalone: false,
  templateUrl: './hit-products.component.html',
  styleUrls: ['./hit-products.component.scss'],
})
export class HitProductsComponent implements OnInit {
  hitProducts: HitProduct[] = [
    {
      id: 1,
      name: 'Биграликда арзон! Яшамоқ + Япон зобити',
      image: 'assets/images/products/books.webp',
      price: 99000,
      oldPrice: 129000,
      monthlyPayment: 27500,
      installmentMonths: 4,
      rating: 5,
      reviewsCount: 2,
      badge: 'СКИДКА',
    },
    {
      id: 2,
      name: 'Смартфон Apple iPhone 16 128GB (1 SIM) Nanosim+esim Black',
      image: 'assets/images/products/iphone.webp',
      price: 10219000,
      oldPrice: 11089000,
      monthlyPayment: 1243400,
      installmentMonths: 12,
      rating: 5,
      reviewsCount: 0,
      badge: 'СКИДКА',
    },
    {
      id: 3,
      name: 'Пылесос Dyson V15 Detect Absolute',
      image: 'assets/images/products/dyson.webp',
      price: 6959000,
      monthlyPayment: 835100,
      installmentMonths: 12,
      rating: 3,
      reviewsCount: 6,
      isTop: true,
    },
    {
      id: 4,
      name: 'Smart TV приставка Xiaomi Mi TV Stick 4K',
      image: 'assets/images/products/xiaomi-redmi14c.webp',
      price: 679000,
      monthlyPayment: 188500,
      installmentMonths: 4,
      rating: 3,
      reviewsCount: 3,
      isTop: true,
    },
    {
      id: 5,
      name: 'Парогенератор Braun CareStyle 7 Pro IS7286BK',
      image: 'assets/images/products/braun-shaver.webp',
      price: 3629000,
      monthlyPayment: 435500,
      installmentMonths: 12,
      rating: 5,
      reviewsCount: 1,
      isTop: true,
    },
    {
      id: 6,
      name: 'Смартфон Xiaomi Redmi Note 14 Pro 8/256GB Midnight Black',
      image: 'assets/images/products/xiaomi-redmi15c.webp',
      price: 3339000,
      oldPrice: 3999000,
      monthlyPayment: 406300,
      installmentMonths: 12,
      rating: 4,
      reviewsCount: 8,
      badge: 'СУПЕР ЦЕНА',
    },
    {
      id: 7,
      name: 'Смартфон HONOR X6c 6/128GB Океанический голубой',
      image: 'assets/images/products/honor-phone.webp',
      price: 1499000,
      oldPrice: 1739000,
      monthlyPayment: 182400,
      installmentMonths: 12,
      rating: 5,
      reviewsCount: 1,
      badge: 'СУПЕР ЦЕНА',
    },
    {
      id: 8,
      name: 'Смартфон Samsung Galaxy A56 5G 8/256 Awesome Graphite',
      image: 'assets/images/products/samsung-galaxy-a56.webp',
      price: 5009000,
      oldPrice: 5579000,
      monthlyPayment: 609500,
      installmentMonths: 12,
      rating: 5,
      reviewsCount: 3,
      badge: 'СУПЕР ЦЕНА',
    },
    {
      id: 9,
      name: 'Solaray, True Herbs, Kelp, водоросли, 550 мг, 100...',
      image: 'assets/images/products/solaray-herb.webp',
      price: 239000,
      monthlyPayment: 66400,
      installmentMonths: 4,
      rating: 5,
      reviewsCount: 0,
    },
    {
      id: 10,
      name: '"Asaxiy Books ҳин бестселлерлари 2024" тўплами',
      image: 'assets/images/products/books.webp',
      price: 799000,
      oldPrice: 1099000,
      monthlyPayment: 221800,
      installmentMonths: 4,
      rating: 5,
      reviewsCount: 1,
      badge: 'СУПЕР ЦЕНА',
    },
  ];

  // Convert HitProducts to shared Product interface - use a property instead of getter
  products: Product[] = [];

  ngOnInit(): void {
    this.products = this.hitProducts.map((hitProduct) => this.mapToProduct(hitProduct));
  }

  // TrackBy function to help Angular track items efficiently
  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  private mapToProduct(hitProduct: HitProduct): Product {
    return {
      id: hitProduct.id,
      name: hitProduct.name,
      images: [hitProduct.image], // Convert single image to array
      currentImageIndex: 0,
      price: hitProduct.price,
      oldPrice: hitProduct.oldPrice,
      monthlyPayment: hitProduct.monthlyPayment,
      installmentMonths: hitProduct.installmentMonths,
      rating: hitProduct.rating,
      reviewsCount: hitProduct.reviewsCount,
      badge: hitProduct.badge || (hitProduct.isTop ? 'ТОП' : undefined),
      badgeType: hitProduct.badge ? 'discount' : hitProduct.isTop ? 'top' : undefined,
      brand: '', // Default values for required fields
      memory: '',
      processor: '',
      inStock: true,
    };
  }
}
