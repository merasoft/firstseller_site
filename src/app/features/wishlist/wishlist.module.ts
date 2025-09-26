// src/app/features/wishlist/wishlist.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishlistComponent } from './pages/wishlist/wishlist.component';

@NgModule({
  declarations: [WishlistComponent],
  imports: [CommonModule, SharedModule, WishlistRoutingModule],
})
export class WishlistModule {}
