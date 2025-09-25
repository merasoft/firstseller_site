import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonAction: string;
  backgroundColor: string;
  gradientFrom: string;
  gradientTo: string;
  iconType: 'phone' | 'laptop' | 'tv';
  textColor: string;
  accentColor: string;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  carouselSlides: CarouselSlide[] = [
    {
      id: 1,
      title: 'Samsung Galaxy',
      subtitle: 'S25 FE',
      description: '866,985 сум/ойдан муддатли тўлов',
      buttonText: 'Харид қилиш',
      buttonAction: 'buy',
      backgroundColor: 'bg-gradient-to-r from-gray-900 via-gray-800 to-black',
      gradientFrom: 'from-black',
      gradientTo: 'to-transparent',
      iconType: 'phone',
      textColor: 'text-white',
      accentColor: 'text-primary-400',
    },
    {
      id: 2,
      title: 'Gaming',
      subtitle: 'Ноутбуклар',
      description: 'RTX 4060 видеокарта билан',
      buttonText: 'Каталог',
      buttonAction: 'catalog',
      backgroundColor: 'bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800',
      gradientFrom: 'from-blue-600',
      gradientTo: 'to-purple-800',
      iconType: 'laptop',
      textColor: 'text-white',
      accentColor: 'text-blue-300',
    },
    {
      id: 3,
      title: 'Smart TV',
      subtitle: '4K UHD',
      description: '65" гача ҳажмларда',
      buttonText: 'Кўриш',
      buttonAction: 'view',
      backgroundColor: 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600',
      gradientFrom: 'from-indigo-600',
      gradientTo: 'to-pink-600',
      iconType: 'tv',
      textColor: 'text-white',
      accentColor: 'text-purple-300',
    },
  ];
  top_categories: any = [];

  constructor(private router: Router) {}

  async loadCategories() {
    try {
      const response = await fetch('/assets/data/categories.json');
      if (response.ok) {
        const data = await response.json();
        this.top_categories = data.filter((cat: any) => cat.isPopular);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  }

  getCategoryUrl(category: any) {
    const slugs = [category.parentSlug, category.slug].filter(Boolean);
    return ['/catalog', ...slugs];
  }

  onCarouselSlideClick(slide: CarouselSlide) {
    console.log('Slide clicked:', slide);
    // Handle slide click actions based on slide.buttonAction
    switch (slide.buttonAction) {
      case 'buy':
        // Navigate to purchase page or product detail
        this.router.navigate(['/catalog/smartphones']);
        break;
      case 'catalog':
        // Navigate to catalog
        this.router.navigate(['/catalog']);
        break;
      case 'view':
        // Navigate to TV category
        this.router.navigate(['/catalog/tv-audio']);
        break;
    }
  }

  ngOnInit() {
    this.loadCategories();
  }

  ngOnDestroy() {
    // Cleanup if needed
  }
}
