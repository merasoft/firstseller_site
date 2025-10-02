import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FaqComponent } from './pages/faq/faq.component';
import { OrderInfoComponent } from './pages/order-info/order-info.component';
import { ServicesComponent } from './pages/services/services.component';
import { WarrantyServiceComponent } from './pages/warranty-service/warranty-service.component';
import { ReturnExchangeComponent } from './pages/return-exchange/return-exchange.component';
import { SitemapComponent } from './pages/sitemap/sitemap.component';

const routes: Routes = [
  { path: 'faq', component: FaqComponent },
  { path: 'order-info', component: OrderInfoComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'warranty-service', component: WarrantyServiceComponent },
  { path: 'return-exchange', component: ReturnExchangeComponent },
  { path: 'sitemap', component: SitemapComponent },
  { path: '', redirectTo: 'faq', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpRoutingModule {}
