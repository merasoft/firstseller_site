import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Popover } from 'primeng/popover';
import { TranslateService } from '@ngx-translate/core';
import {MegaMenuService} from '../../services/mega-menu.service';
import {takeUntil, Subject} from 'rxjs';

interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  count: number;
  children: Category[];
}

// interface CatalogData {
//   categories: Category[];
// }

interface FeaturedProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  categoryId: number;
}

@Component({
  selector: 'app-mega-menu',
  standalone: false,
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss'],
})
export class MegaMenuComponent implements OnInit {
  private destroy$ = new Subject<void>();
  @ViewChild('menu') menu!: Popover;

  catalogData: any = null;
  activeCategory: Category | null = null;
  featuredProducts: FeaturedProduct[] = [];
  isLoading = false;
  isMenuOpen = false;
  isDialogOpen = false;
  openPanels = new Set<number>();

  constructor(private router: Router, private translate: TranslateService, private megaMenuService: MegaMenuService) {}

  async loadCatalogData() {
    try {
      this.isLoading = true;
      const response = await fetch('/assets/data/catalog-menu.json');
      this.megaMenuService
        .get()
        .pipe(takeUntil(this.destroy$))
        .subscribe((data : any) => {
          this.catalogData = data;
          console.log(data, "first seller data");
        });
      this.megaMenuService.load();

      // if (response.ok) {
      //   const data = await response.json();
      //   this.catalogData = data;
      //   if (this.catalogData.categories.length > 0) {
      //     this.activeCategory = this.catalogData.categories[0];
      //   }
      // }
    } catch (error) {
      console.error('Error loading catalog data:', error);
    } finally {
      this.isLoading = false;
    }
  }

  setActiveCategory(category: Category) {
    this.activeCategory = category;
  }

  navigateToProduct(product: FeaturedProduct) {
    this.router.navigate(['/catalog/product', product.id]);
  }

  toggleMenu(event: any) {
    this.menu.toggle(event);
    this.isMenuOpen = this.menu.overlayVisible;

    if (this.isMenuOpen && !this.catalogData) {
      this.loadCatalogData();
    }
  }

  toggleDrawer() {
    this.isDialogOpen = !this.isDialogOpen;

    if (this.isDialogOpen && !this.catalogData) {
      this.loadCatalogData();
    }
  }

  onSubcategoryClick(subcategory: Category) {
    this.router.navigate(['/catalog', this.activeCategory?.slug, subcategory.slug]);
  }

  trackByCategory(index: number, category: Category): number {
    return category.id;
  }

  toggleAccordionPanel(categoryId: number) {
    if (this.openPanels.has(categoryId)) {
      this.openPanels.delete(categoryId);
    } else {
      this.openPanels.clear();
      this.openPanels.add(categoryId);
    }
  }

  isAccordionPanelOpen(categoryId: number): boolean {
    return this.openPanels.has(categoryId);
  }

  closeDrawer() {
    this.isDialogOpen = false;
  }

  closeMenu() {
    if (this.menu) {
      this.menu.hide();
    }
  }

  ngOnInit() {
    this.loadCatalogData();

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
