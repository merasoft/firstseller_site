// src/app/shared/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Cart, CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<Cart>(this.getEmptyCart());
  public cart$ = this.cartSubject.asObservable();

  private isCartDrawerOpenSubject = new BehaviorSubject<boolean>(false);
  public isCartDrawerOpen$ = this.isCartDrawerOpenSubject.asObservable();

  constructor(private messageService: MessageService) {
    this.loadCartFromStorage();
  }

  private getEmptyCart(): Cart {
    return {
      items: [],
      totalItems: 0,
      subtotal: 0,
      tax: 0,
      shipping: 0,
      total: 0,
    };
  }

  private loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cart = JSON.parse(savedCart);
      this.cartSubject.next(cart);
    }
  }

  private saveCartToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartSubject.value));
  }

  private calculateTotals(items: CartItem[]): Cart {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const tax = subtotal * 0.12; // 12% tax
    const shipping = subtotal > 500000 ? 0 : 25000; // Free shipping over 500,000 sum
    const total = subtotal + tax + shipping;

    return {
      items,
      totalItems,
      subtotal,
      tax,
      shipping,
      total,
    };
  }

  addToCart(item: Omit<CartItem, 'id'>): void {
    const currentCart = this.cartSubject.value;
    const existingItemIndex = currentCart.items.findIndex((cartItem) => cartItem.productId === item.productId && JSON.stringify(cartItem.selectedVariant) === JSON.stringify(item.selectedVariant));

    let updatedItems: CartItem[];
    let isNewItem = false;

    if (existingItemIndex > -1) {
      // Update quantity of existing item
      updatedItems = [...currentCart.items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + item.quantity,
      };
    } else {
      // Add new item
      const newItem: CartItem = {
        ...item,
        id: `${item.productId}-${Date.now()}-${Math.random()}`,
      };
      updatedItems = [...currentCart.items, newItem];
      isNewItem = true;
    }

    const updatedCart = this.calculateTotals(updatedItems);
    this.cartSubject.next(updatedCart);
    this.saveCartToStorage();

    // Show success toast notification
    this.messageService.add({
      severity: 'success',
      summary: isNewItem ? 'Добавлено в корзину' : 'Количество обновлено',
      detail: `${item.name}`,
      life: 3000,
    });
  }

  removeFromCart(itemId: string): void {
    const currentCart = this.cartSubject.value;
    const updatedItems = currentCart.items.filter((item) => item.id !== itemId);
    const updatedCart = this.calculateTotals(updatedItems);
    this.cartSubject.next(updatedCart);
    this.saveCartToStorage();
  }

  updateQuantity(itemId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(itemId);
      return;
    }

    const currentCart = this.cartSubject.value;
    const updatedItems = currentCart.items.map((item) => (item.id === itemId ? { ...item, quantity } : item));
    const updatedCart = this.calculateTotals(updatedItems);
    this.cartSubject.next(updatedCart);
    this.saveCartToStorage();
  }

  clearCart(): void {
    const emptyCart = this.getEmptyCart();
    this.cartSubject.next(emptyCart);
    this.saveCartToStorage();
  }

  openCartDrawer(): void {
    this.isCartDrawerOpenSubject.next(true);
  }

  closeCartDrawer(): void {
    this.isCartDrawerOpenSubject.next(false);
  }

  toggleCartDrawer(): void {
    this.isCartDrawerOpenSubject.next(!this.isCartDrawerOpenSubject.value);
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }

  getCartItemsCount(): number {
    return this.cartSubject.value.totalItems;
  }
}
