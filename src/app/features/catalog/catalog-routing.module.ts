import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { CompareComponent } from './pages/compare/compare.component';

const routes: Routes = [
  {
    // /catalog - все товары
    path: '',
    component: CatalogComponent,
  },
  {
    // /catalog/cart - корзина
    path: 'cart',
    component: CartComponent,
  },
  {
    // /catalog/compare - сравнение товаров
    path: 'compare',
    component: CompareComponent,
  },
  {
    // /catalog/product/samsung-galaxy-s25 - страница товара
    path: 'product/:id',
    component: ProductDetailComponent,
  },
  {
    // /catalog/smartphones - категория
    path: ':category',
    component: CatalogComponent,
  },
  {
    // /catalog/smartphones/apple - подкатегория
    path: ':category/:subcategory',
    component: CatalogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule {}
