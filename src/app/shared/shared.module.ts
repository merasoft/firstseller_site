// src/app/shared/shared.module.ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// PrimeNG Imports
import { AccordionModule } from 'primeng/accordion';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { DataViewModule } from 'primeng/dataview';
import { DrawerModule } from 'primeng/drawer';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PopoverModule } from 'primeng/popover';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { SelectModule } from 'primeng/select';
import { SidebarModule } from 'primeng/sidebar';
import { SliderModule } from 'primeng/slider';
import { StepsModule } from 'primeng/steps';
import { TabsModule } from 'primeng/tabs';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { CartDrawerComponent } from './components/cart-drawer/cart-drawer.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MegaMenuComponent } from './components/mega-menu/mega-menu.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

const PRIMENG_MODULES = [
  AccordionModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonModule,
  CardModule,
  CarouselModule,
  CheckboxModule,
  DataViewModule,
  DropdownModule,
  InputNumberModule,
  InputTextModule,
  MenuModule,
  MegaMenuModule,
  MultiSelectModule,
  OverlayPanelModule,
  PaginatorModule,
  PopoverModule,
  ProgressSpinnerModule,
  RadioButtonModule,
  RatingModule,
  SelectModule,
  SidebarModule,
  SliderModule,
  TabsModule,
  TagModule,
  ToastModule,
  TooltipModule,
  PopoverModule,
  ChipModule,
  DrawerModule,
  StepsModule,
];

@NgModule({
  declarations: [HeaderComponent, FooterComponent, MegaMenuComponent, ProductCardComponent, CartDrawerComponent],
  imports: [CommonModule, FormsModule, RouterModule, ...PRIMENG_MODULES],
  exports: [HeaderComponent, FooterComponent, MegaMenuComponent, ProductCardComponent, CartDrawerComponent, CommonModule, FormsModule, RouterModule, ...PRIMENG_MODULES],
})
export class SharedModule {}
