// src/app/features/catalog/catalog.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

@NgModule({
  declarations: [
    CatalogComponent,
    ProductDetailComponent, // ✅ Добавить новый компонент
  ],
  imports: [CommonModule, SharedModule, CatalogRoutingModule],
})
export class CatalogModule {}
