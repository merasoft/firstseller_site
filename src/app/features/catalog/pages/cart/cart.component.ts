// src/app/features/catalog/pages/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from '../../../../shared/services/cart.service';
import { Cart, CartItem } from '../../../../shared/models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [],
    totalItems: 0,
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0,
  };

  constructor(private cartService: CartService, private router: Router, private translate: TranslateService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cart = cart;
    });
  }

  updateQuantity(itemId: string, quantity: number): void {
    this.cartService.updateQuantity(itemId, quantity);
  }

  removeItem(itemId: string): void {
    this.cartService.removeFromCart(itemId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  continueShopping(): void {
    this.router.navigate(['/catalog']);
  }

  proceedToCheckout(): void {
    // Navigate to checkout page (to be implemented)
    console.log('Proceed to checkout');
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
    if (item.selectedVariant?.size) {
      variants.push(item.selectedVariant.size);
    }
    return variants.join(', ');
  }

  trackByItemId(index: number, item: CartItem): string {
    return item.id;
  }

  getFreeShippingMessage(amount: number): string {
    return this.translate.instant('CART.FREE_SHIPPING_ADD', { amount: this.formatPrice(amount) });
  }
}
