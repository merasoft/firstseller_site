// src/app/features/catalog/catalog.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { CompareComponent } from './pages/compare/compare.component';

@NgModule({
  declarations: [CatalogComponent, ProductDetailComponent, CartComponent, CompareComponent],
  imports: [CommonModule, HttpClientModule, SharedModule, CatalogRoutingModule],
})
export class CatalogModule {}
