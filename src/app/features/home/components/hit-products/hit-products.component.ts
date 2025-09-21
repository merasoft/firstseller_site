import { Component } from '@angular/core';

interface Product {
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
  styleUrls: ['./hit-products.component.scss']
})
export class HitProductsComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Биграликда арзон! Яшамоқ + Япон зобити',
      image: 'https://via.placeholder.com/300x300/ef4444/ffffff?text=Books',
      price: 99000,
      oldPrice: 129000,
      monthlyPayment: 27500,
      installmentMonths: 4,
      rating: 5,
      reviewsCount: 2,
      badge: 'СКИДКА'
    },
    {
      id: 2,
      name: 'Смартфон Apple iPhone 16 128GB (1 SIM) Nanosim+esim Black',
      image: 'https://via.placeholder.com/300x300/000000/ffffff?text=iPhone',
      price: 10219000,
      oldPrice: 11089000,
      monthlyPayment: 1243400,
      installmentMonths: 12,
      rating: 5,
      reviewsCount: 0,
      badge: 'СКИДКА'
    },
    {
      id: 3,
      name: 'Пылесос Dyson V15 Detect Absolute',
      image: 'https://via.placeholder.com/300x300/fbbf24/000000?text=Dyson',
      price: 6959000,
      monthlyPayment: 835100,
      installmentMonths: 12,
      rating: 3,
      reviewsCount: 6,
      isTop: true
    },
    {
      id: 4,
      name: 'Smart TV приставка Xiaomi Mi TV Stick 4K',
      image: 'https://via.placeholder.com/300x300/1f2937/ffffff?text=Xiaomi',
      price: 679000,
      monthlyPayment: 188500,
      installmentMonths: 4,
      rating: 3,
      reviewsCount: 3,
      isTop: true
    },
    {
      id: 5,
      name: 'Парогенератор Braun CareStyle 7 Pro IS7286BK',
      image: 'https://via.placeholder.com/300x300/6b7280/ffffff?text=Braun',
      price: 3629000,
      monthlyPayment: 435500,
      installmentMonths: 12,
      rating: 5,
      reviewsCount: 1,
      isTop: true
    },
    {
      id: 6,
      name: 'Смартфон Xiaomi Redmi Note 14 Pro 8/256GB Midnight Black',
      image: 'https://via.placeholder.com/300x300/000000/ff6600?text=Redmi',
      price: 3339000,
      oldPrice: 3999000,
      monthlyPayment: 406300,
      installmentMonths: 12,
      rating: 4,
      reviewsCount: 8,
      badge: 'СУПЕР ЦЕНА'
    },
    {
      id: 7,
      name: 'Смартфон HONOR X6c 6/128GB Океанический голубой',
      image: 'https://via.placeholder.com/300x300/06b6d4/ffffff?text=HONOR',
      price: 1499000,
      oldPrice: 1739000,
      monthlyPayment: 182400,
      installmentMonths: 12,
      rating: 5,
      reviewsCount: 1,
      badge: 'СУПЕР ЦЕНА'
    },
    {
      id: 8,
      name: 'Смартфон Samsung Galaxy A56 5G 8/256 Awesome Graphite',
      image: 'https://via.placeholder.com/300x300/374151/ffffff?text=Samsung',
      price: 5009000,
      oldPrice: 5579000,
      monthlyPayment: 609500,
      installmentMonths: 12,
      rating: 5,
      reviewsCount: 3,
      badge: 'СУПЕР ЦЕНА'
    },
    {
      id: 9,
      name: 'Solaray, True Herbs, Kelp, водоросли, 550 мг, 100...',
      image: 'https://via.placeholder.com/300x300/10b981/ffffff?text=Kelp',
      price: 239000,
      monthlyPayment: 66400,
      installmentMonths: 4,
      rating: 5,
      reviewsCount: 0
    },
    {
      id: 10,
      name: '"Asaxiy Books ҳин бестселлерлари 2024" тўплами',
      image: 'https://via.placeholder.com/300x300/f59e0b/ffffff?text=Books+2024',
      price: 799000,
      oldPrice: 1099000,
      monthlyPayment: 221800,
      installmentMonths: 4,
      rating: 5,
      reviewsCount: 1,
      badge: 'СУПЕР ЦЕНА'
    }
  ];

  // Generate star array for rating display
  getStars(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < rating);
  }

  // Format price with spaces
  formatPrice(price: number): string {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  onBuyOneClick(product: Product): void {
    console.log('Купить в один клик:', product.name);
    // Implement buy one click logic
  }

  onAddToCart(product: Product): void {
    console.log('Добавить в корзину:', product.name);
    // Implement add to cart logic
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = 'assets/images/placeholder.jpg';
    }
  }
}
