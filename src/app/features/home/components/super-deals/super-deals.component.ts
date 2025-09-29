import { Component, OnInit, ViewChild } from '@angular/core';
import { Carousel } from 'primeng/carousel';
import { TranslateService } from '@ngx-translate/core';

interface SuperDeal {
  id: number;
  name: string;
  image: string;
  oldPrice: number;
  newPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  endDate: string;
  category: string;
}

@Component({
  selector: 'app-super-deals',
  standalone: false,
  templateUrl: './super-deals.component.html',
  styleUrls: ['./super-deals.component.scss'],
})
export class SuperDealsComponent implements OnInit {
  @ViewChild('carousel') carousel!: Carousel;

  private _cachedStars: Map<number, ('full' | 'empty' | 'half')[]> = new Map();

  constructor(private translate: TranslateService) {}

  superDeals: SuperDeal[] = [
    {
      id: 1,
      name: 'Смартфон HONOR X9c 6/128GB Ocean Blue',
      image: '/assets/images/honor9c.webp',
      oldPrice: 4700000,
      newPrice: 3649000,
      discount: 23,
      rating: 5,
      reviewCount: 142,
      endDate: '01.10.2025',
      category: 'smartphones',
    },
    {
      id: 2,
      name: 'Ноутбук ACER ASPIRE LITE AL16-52P-33AJ 8/512GB',
      image: '/assets/images/honor9c.webp',
      oldPrice: 4339000,
      newPrice: 3809000,
      discount: 13,
      rating: 5,
      reviewCount: 89,
      endDate: '01.10.2025',
      category: 'laptops',
    },
    {
      id: 3,
      name: 'Смартфон HONOR X6c 6/128GB Oceanado',
      image: '/assets/images/honor9c.webp',
      oldPrice: 1739000,
      newPrice: 1499000,
      discount: 14,
      rating: 5,
      reviewCount: 67,
      endDate: '01.10.2025',
      category: 'smartphones',
    },
    {
      id: 4,
      name: 'Смартфон Xiaomi Redmi 15C 8/256GB Black',
      image: '/assets/images/products/xiaomi-redmi15c.webp',
      oldPrice: 2029000,
      newPrice: 1789000,
      discount: 12,
      rating: 5,
      reviewCount: 156,
      endDate: '01.10.2025',
      category: 'smartphones',
    },
    {
      id: 5,
      name: 'Смартфон Xiaomi Redmi 14C 8/256GB Black',
      image: '/assets/images/products/xiaomi-redmi14c.webp',
      oldPrice: 1979000,
      newPrice: 1539000,
      discount: 23,
      rating: 5,
      reviewCount: 203,
      endDate: '01.10.2025',
      category: 'smartphones',
    },
    {
      id: 6,
      name: 'Телевизор Samsung Smart TV 43 Crystal UHD',
      image: '/assets/images/products/samsung-tv.webp',
      oldPrice: 1819000,
      newPrice: 1489000,
      discount: 18,
      rating: 4,
      reviewCount: 78,
      endDate: '01.10.2025',
      category: 'tv',
    },
    {
      id: 7,
      name: 'Пылесос робот Xiaomi Mi Robot Vacuum',
      image: '/assets/images/products/xiaomi-vacuum.webp',
      oldPrice: 2500000,
      newPrice: 1999000,
      discount: 20,
      rating: 5,
      reviewCount: 234,
      endDate: '01.10.2025',
      category: 'appliances',
    },
    {
      id: 7,
      name: 'Смартфон Xiaomi Redmi 14C 8/256GB Black',
      image: '/assets/images/products/xiaomi-redmi14c.webp',
      oldPrice: 2500000,
      newPrice: 1999000,
      discount: 20,
      rating: 5,
      reviewCount: 234,
      endDate: '01.10.2025',
      category: 'smartphones',
    },
  ];

  responsiveOptions = [
    {
      breakpoint: '1300px',
      numVisible: 5,
      numScroll: 2,
    },
    {
      breakpoint: '1160px',
      numVisible: 4,
      numScroll: 2,
    },
    {
      breakpoint: '850px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '640px',
      numVisible: 2,
      numScroll: 1,
    },
  ];

  formatPrice(price: number): string {
    return price.toLocaleString('uz-UZ');
  }

  onDealClick(deal: SuperDeal) {
    console.log('Deal clicked:', deal);
    // Handle deal click - navigate to product detail page
  }

  getStars(rating: number): ('full' | 'empty' | 'half')[] {
    // Use cached result to avoid creating new arrays on every call
    if (!this._cachedStars.has(rating)) {
      this._cachedStars.set(
        rating,
        Array(5)
          .fill(0)
          .map((_, i) => {
            if (rating >= i + 1) return 'full';
            if (rating >= i + 0.5) return 'half';
            return 'empty';
          })
      );
    }
    return this._cachedStars.get(rating)!;
  }

  onPrevPageClick(event: any) {
    this.carousel.navBackward(event);
  }
  onNextPageClick(event: any) {
    this.carousel.navForward(event);
  }

  ngOnInit() {
    // Component initialization
  }
}
