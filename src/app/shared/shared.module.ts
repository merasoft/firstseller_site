// src/app/shared/shared.module.ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// PrimeNG Imports
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CheckboxModule } from 'primeng/checkbox';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PopoverModule } from 'primeng/popover';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { SidebarModule } from 'primeng/sidebar';
import { SliderModule } from 'primeng/slider';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MegaMenuComponent } from './components/mega-menu/mega-menu.component';

const PRIMENG_MODULES = [
  ButtonModule,
  InputTextModule,
  CardModule,
  BadgeModule,
  TagModule,
  CarouselModule,
  DataViewModule,
  RatingModule,
  DropdownModule,
  SliderModule,
  CheckboxModule,
  RadioButtonModule,
  MenuModule,
  MegaMenuModule,
  ProgressSpinnerModule,
  TooltipModule,
  OverlayPanelModule,
  SidebarModule,
  PopoverModule,
];

@NgModule({
  declarations: [HeaderComponent, FooterComponent, MegaMenuComponent],
  imports: [CommonModule, FormsModule, RouterModule, ...PRIMENG_MODULES],
  exports: [HeaderComponent, FooterComponent, MegaMenuComponent, CommonModule, FormsModule, RouterModule, ...PRIMENG_MODULES],
})
export class SharedModule {}
