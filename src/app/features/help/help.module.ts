import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AccordionModule } from 'primeng/accordion';

import { HelpRoutingModule } from './help-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { FaqComponent } from './pages/faq/faq.component';
import { OrderInfoComponent } from './pages/order-info/order-info.component';
import { ServicesComponent } from './pages/services/services.component';
import { WarrantyServiceComponent } from './pages/warranty-service/warranty-service.component';
import { ReturnExchangeComponent } from './pages/return-exchange/return-exchange.component';
import { SitemapComponent } from './pages/sitemap/sitemap.component';

@NgModule({
  declarations: [FaqComponent, OrderInfoComponent, ServicesComponent, WarrantyServiceComponent, ReturnExchangeComponent, SitemapComponent],
  imports: [CommonModule, TranslateModule, AccordionModule, HelpRoutingModule, SharedModule],
})
export class HelpModule {}
