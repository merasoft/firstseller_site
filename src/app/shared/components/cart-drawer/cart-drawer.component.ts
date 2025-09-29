// src/app/shared/components/cart-drawer/cart-drawer.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from '../../services/cart.service';
import { Cart, CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart-drawer',
  standalone: false,
  templateUrl: './cart-drawer.component.html',
  styleUrls: ['./cart-drawer.component.scss'],
})
export class CartDrawerComponent implements OnInit {
  cart: Cart = {
    items: [],
    totalItems: 0,
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0,
  };
  isOpen = false;

  constructor(private cartService: CartService, private router: Router, private translate: TranslateService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cart = cart;
    });

    this.cartService.isCartDrawerOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }

  closeDrawer(): void {
    this.cartService.closeCartDrawer();
  }

  removeItem(itemId: string): void {
    this.cartService.removeFromCart(itemId);
  }

  updateQuantity(itemId: string, quantity: number): void {
    this.cartService.updateQuantity(itemId, quantity);
  }

  viewCart(): void {
    this.closeDrawer();
    this.router.navigate(['/catalog/cart']);
  }

  proceedToCheckout(): void {
    this.closeDrawer();
    // Navigate to checkout page (to be implemented)
    console.log('Proceed to checkout');
  }

  continueShopping(): void {
    this.closeDrawer();
    this.router.navigate(['/catalog']);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('uz-UZ').format(price);
  }

  getVariantText(item: CartItem): string {
    const variants: string[] = [];
    if (item.selectedVariant?.color) {
      variants.push(item.selectedVariant.color);
    }
    if (item.selectedVariant?.memory) {
      variants.push(item.selectedVariant.memory);
    }
    return variants.join(', ');
  }

  trackByItemId(index: number, item: CartItem): string {
    return item.id;
  }
}
