import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { SiteRoutingModule } from './site-routing.module';
import { AboutComponent } from './pages/about/about.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { WarrantyComponent } from './pages/warranty/warranty.component';
import { ContactComponent } from './pages/contact/contact.component';

@NgModule({
  declarations: [AboutComponent, DeliveryComponent, PaymentComponent, WarrantyComponent, ContactComponent],
  imports: [CommonModule, FormsModule, SharedModule, SiteRoutingModule],
})
export class SiteModule {}
