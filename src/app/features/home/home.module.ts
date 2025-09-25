// src/app/features/home/home.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SuperDealsComponent } from './components/super-deals/super-deals.component';
import { HitProductsComponent } from './components/hit-products/hit-products.component';
import { TopProductsComponent } from './components/top-products/top-products.component';
import { AdvantagesComponent } from './components/advantages/advantages.component';
import { PublicationsComponent } from './components/publications/publications.component';

@NgModule({
  declarations: [HomeComponent, SuperDealsComponent, HitProductsComponent, TopProductsComponent, AdvantagesComponent, PublicationsComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule],
})
export class HomeModule {}
