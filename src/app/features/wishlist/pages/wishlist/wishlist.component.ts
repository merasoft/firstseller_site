// src/app/features/wishlist/pages/wishlist/wishlist.component.ts
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';

@Component({
  selector: 'app-wishlist',
  standalone: false,
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  pageTitle = 'Список желаний';
  wishlistProducts: Product[] = [];

  // Sample wishlist products data
  sampleProducts: Product[] = [
    {
      id: 1,
      name: 'Смартфон Samsung Galaxy S25 Ultra 12/256 ГБ Jet Black',
      images: [
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      ],
      currentImageIndex: 0,
      price: 14379000,
      oldPrice: 15079000,
      monthlyPayment: 1749500,
      installmentMonths: 12,
      rating: 4.8,
      reviewsCount: 126,
      badge: 'НОВИНКА',
      badgeType: 'new',
      brand: 'Samsung',
      memory: '12GB',
      processor: 'Snapdragon',
      inStock: true,
    },
    {
      id: 2,
      name: 'Смартфон iPhone 16 Pro Max 256GB Natural Titanium',
      images: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      ],
      currentImageIndex: 0,
      price: 52314918,
      oldPrice: 55000000,
      monthlyPayment: 6362990,
      installmentMonths: 12,
      rating: 4.9,
      reviewsCount: 89,
      badge: 'ТОП',
      badgeType: 'top',
      brand: 'Apple',
      memory: '8GB',
      processor: 'A18 Pro',
      inStock: true,
    },
    {
      id: 3,
      name: 'Смартфон Honor X9C 8/256 ГБ Jade Cyan',
      images: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      ],
      currentImageIndex: 0,
      price: 5690000,
      oldPrice: 6200000,
      monthlyPayment: 691800,
      installmentMonths: 12,
      rating: 4.6,
      reviewsCount: 45,
      badge: 'СКИДКА',
      badgeType: 'discount',
      brand: 'Honor',
      memory: '8GB',
      processor: 'Snapdragon',
      inStock: true,
    },
    {
      id: 4,
      name: 'Смартфон Vivo Y36 8/256 ГБ Vibrant Gold',
      images: [
        'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      ],
      currentImageIndex: 0,
      price: 15289000,
      oldPrice: 16119000,
      monthlyPayment: 1860200,
      installmentMonths: 12,
      rating: 5,
      reviewsCount: 23,
      badge: 'СУПЕР ЦЕНА',
      badgeType: 'super-price',
      brand: 'Vivo',
      memory: '8GB',
      processor: 'Snapdragon',
      inStock: true,
    },
  ];

  ngOnInit(): void {
    this.loadWishlistProducts();
  }

  loadWishlistProducts(): void {
    // In a real app, this would load from a service/API
    // For now, we'll use sample data
    this.wishlistProducts = this.sampleProducts;
  }

  removeFromWishlist(productId: number): void {
    this.wishlistProducts = this.wishlistProducts.filter((product) => product.id !== productId);
  }

  clearWishlist(): void {
    this.wishlistProducts = [];
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
