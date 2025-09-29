// src/app/features/home/components/publications/publications.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

interface Publication {
  id: number;
  title: string;
  description?: string;
  date: string;
  image: string;
  category: string;
  link?: string;
}

@Component({
  selector: 'app-publications',
  standalone: false,
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss'],
})
export class PublicationsComponent implements OnInit {
  activeCategory: string = 'PUBLICATIONS.ALL';

  categories: string[] = ['PUBLICATIONS.ALL', 'PUBLICATIONS.REVIEWS', 'PUBLICATIONS.NEWS'];

  constructor(private router: Router, private translate: TranslateService) {}

  publications: Publication[] = [
    {
      id: 1,
      title: 'Открытие нового филиала FirstSeller Махтумкули в Ташкенте!',
      date: '2025-01-31',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'news',
    },
    {
      id: 2,
      title: 'Новое поступление PlayStation 5 и аксессуары',
      date: '2025-03-10',
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'news',
    },
    {
      id: 3,
      title: 'Компания BERG уверенно занимает свои позиции в нашей сети магазинов FirstSeller',
      description: 'Компания BERG уверенно занимает свои позиции в нашей сети магазинов FirstSeller, становясь...',
      date: '2025-01-31',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'reviews',
    },
    {
      id: 4,
      title: 'Руководство по выбору смартфона в 2025 году',
      date: '2025-03-15',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
      category: 'reviews',
    },
  ];

  filteredPublications: Publication[] = [...this.publications];

  ngOnInit(): void {
    this.filterPublications();
  }

  setActiveCategory(category: string): void {
    this.activeCategory = category;
    this.filterPublications();
  }

  private filterPublications(): void {
    if (this.activeCategory === 'PUBLICATIONS.ALL') {
      this.filteredPublications = [...this.publications];
    } else {
      // Map translation key to English category
      const categoryMap: { [key: string]: string } = {
        'PUBLICATIONS.NEWS': 'news',
        'PUBLICATIONS.REVIEWS': 'reviews',
      };
      const englishCategory = categoryMap[this.activeCategory];
      this.filteredPublications = this.publications.filter((pub) => pub.category === englishCategory);
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const currentLang = this.translate.currentLang || 'ru';

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    if (currentLang === 'en') {
      return date.toLocaleDateString('en-US', options);
    } else if (currentLang === 'uz') {
      return date.toLocaleDateString('uz-UZ', options);
    } else {
      return date.toLocaleDateString('ru-RU', options);
    }
  }

  getCategoryBadgeClass(category: string): string {
    const classes: { [key: string]: string } = {
      news: 'bg-blue-500',
      reviews: 'bg-purple-500',
      guides: 'bg-green-500',
      sales: 'bg-red-500',
      events: 'bg-orange-500',
    };
    return classes[category] || 'bg-gray-500';
  }

  onPublicationClick(publication: Publication): void {
    // If the publication has an external link, open it in a new tab
    if (publication.link) {
      window.open(publication.link, '_blank', 'noopener,noreferrer');
      return;
    }

    // Navigate to the publication detail page
    this.router.navigate(['/home/publications', publication.id]);
  }
}
