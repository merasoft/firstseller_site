import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface CarouselSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonAction: string;
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
      description: '866,985 сум/месяц в рассрочку',
      image: 'https://previews.123rf.com/images/kchung/kchung1909/kchung190900083/130601427-sunscreen-product-banner-ads-on-orange-square-podium-and-paper-art-background-in-3d-illustration.jpg',
      buttonText: 'Купить',
      buttonAction: 'buy',
    },
    {
      id: 2,
      title: 'Macbook Pro 2024',
      description: '866,985 сум/месяц в рассрочку',
      image: 'https://www.appleshowroominhyderabad.com/images/apple-macbookpro-banner.png',
      buttonText: 'Купить',
      buttonAction: 'buy',
    },
  ];
  smallAds = [
    {
      id: 2,
      title: 'Iphone 16',
      description: 'От 1,241,340 сум/месяц в рассрочку',
      image: 'https://img.freepik.com/free-psd/smartphone-camera-control-social-media-banner-design-template_47987-25416.jpg?semt=ais_hybrid&w=740&q=80',
      buttonText: 'Каталог',
      buttonAction: 'catalog',
    },
    {
      id: 3,
      title: 'Playstation 5',
      description: 'От 1,241,340 сум/месяц в рассрочку',
      image: 'https://i.pcmag.com/imagery/articles/05JBwtq8rn3rI7BE6RDzF84-5..v1725998532.webp',
      buttonText: 'Смотреть',
      buttonAction: 'view',
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
