import { Component, OnInit } from '@angular/core';

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
  styleUrls: ['./super-deals.component.scss']
})
export class SuperDealsComponent implements OnInit {
  superDeals: SuperDeal[] = [
    {
      id: 1,
      name: "Смартфон HONOR X9c 6/128GB Ocean Blue",
      image: "/assets/images/honor9c.webp",
      oldPrice: 4700000,
      newPrice: 3649000,
      discount: 23,
      rating: 5,
      reviewCount: 142,
      endDate: "01.10.2025",
      category: "smartphones"
    },
    {
      id: 2,
      name: "Ноутбук ACER ASPIRE LITE AL16-52P-33AJ 8/512GB",
      image: "/assets/images/honor9c.webp",
      oldPrice: 4339000,
      newPrice: 3809000,
      discount: 13,
      rating: 5,
      reviewCount: 89,
      endDate: "01.10.2025",
      category: "laptops"
    },
    {
      id: 3,
      name: "Смартфон HONOR X6c 6/128GB Oceanado",
      image: "/assets/images/honor9c.webp",
      oldPrice: 1739000,
      newPrice: 1499000,
      discount: 14,
      rating: 5,
      reviewCount: 67,
      endDate: "01.10.2025",
      category: "smartphones"
    },
    {
      id: 4,
      name: "Смартфон Xiaomi Redmi 15C 8/256GB Black",
      image: "/assets/images/products/xiaomi-redmi15c.jpg",
      oldPrice: 2029000,
      newPrice: 1789000,
      discount: 12,
      rating: 5,
      reviewCount: 156,
      endDate: "01.10.2025",
      category: "smartphones"
    },
    {
      id: 5,
      name: "Смартфон Xiaomi Redmi 14C 8/256GB Black",
      image: "/assets/images/products/xiaomi-redmi14c.jpg",
      oldPrice: 1979000,
      newPrice: 1539000,
      discount: 23,
      rating: 5,
      reviewCount: 203,
      endDate: "01.10.2025",
      category: "smartphones"
    },
    {
      id: 6,
      name: "Телевизор Samsung Smart TV 43 Crystal UHD",
      image: "/assets/images/products/samsung-tv.jpg",
      oldPrice: 1819000,
      newPrice: 1489000,
      discount: 18,
      rating: 4,
      reviewCount: 78,
      endDate: "01.10.2025",
      category: "tv"
    },
    {
      id: 7,
      name: "Пылесос робот Xiaomi Mi Robot Vacuum",
      image: "/assets/images/products/xiaomi-vacuum.jpg",
      oldPrice: 2500000,
      newPrice: 1999000,
      discount: 20,
      rating: 5,
      reviewCount: 234,
      endDate: "01.10.2025",
      category: "appliances"
    }
  ];

  currentSlide = 0;
  itemsToShow = 6;

  ngOnInit() {
    this.startAutoSlide();
  }

  formatPrice(price: number): string {
    return price.toLocaleString('uz-UZ');
  }

  nextSlide() {
    if (this.currentSlide < this.superDeals.length - this.itemsToShow) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = Math.max(0, this.superDeals.length - this.itemsToShow);
    }
  }

  startAutoSlide() {
    setInterval(() => {
      this.nextSlide();
    }, 5000); // 5 секунд автомат слайд
  }

  getSliderTransform(): string {
    const translateX = -(this.currentSlide * (100 / this.itemsToShow));
    return `translateX(${translateX}%)`;
  }
}
