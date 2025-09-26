// src/app/features/wishlist/pages/wishlist/wishlist.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../../../shared/models/product.model';
import { WishlistService } from '../../../../shared/services/wishlist.service';
import { CartService } from '../../../../shared/services/cart.service';
import { WishlistItem, Wishlist } from '../../../../shared/models/wishlist.model';

@Component({
  selector: 'app-wishlist',
  standalone: false,
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit, OnDestroy {
  pageTitle = 'Список желаний';
  wishlist: Wishlist = { items: [], totalItems: 0, lastUpdated: new Date() };
  wishlistProducts: Product[] = [];
  private destroy$ = new Subject<void>();

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
      categoryId: 1,
      category: 'Телефоны и гаджеты',
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
      categoryId: 1,
      category: 'Телефоны и гаджеты',
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
      categoryId: 1,
      category: 'Телефоны и гаджеты',
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

  constructor(private wishlistService: WishlistService, private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadWishlistData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadWishlistData(): void {
    this.wishlistService.wishlist$.pipe(takeUntil(this.destroy$)).subscribe((wishlist) => {
      this.wishlist = wishlist;
      // Convert wishlist items to Product array for product-card component
      this.wishlistProducts = wishlist.items.map((item) => ({
        ...item.product,
        currentImageIndex: 0,
        monthlyPayment: Math.round(item.product.price / 12),
        installmentMonths: 12,
        memory: '',
        processor: '',
      }));
    });
  }

  removeFromWishlist(productId: number): void {
    this.wishlistService.removeFromWishlist(productId);
  }

  clearWishlist(): void {
    this.wishlistService.clearWishlist();
  }

  addToCart(item: WishlistItem): void {
    const cartItem = {
      productId: item.product.id,
      name: item.product.name,
      image: item.product.images[0],
      price: item.product.price,
      oldPrice: item.product.oldPrice,
      quantity: 1,
      selectedVariant: {
        color: item.product.brand,
        memory: '', // We don't have memory in wishlist item
      },
      inStock: item.product.inStock,
    };

    this.cartService.addToCart(cartItem);
    this.cartService.openCartDrawer();
  }

  continueShopping(): void {
    this.router.navigate(['/catalog']);
  }

  // Utility functions
  formatPrice(price: number): string {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  trackByItemId(index: number, item: WishlistItem): number {
    return item.id;
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
