// src/app/features/home/components/publications/publications.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  activeCategory: string = 'Все';

  categories: string[] = ['Все', 'Обзоры', 'Новости'];

  constructor(private router: Router) {}

  publications: Publication[] = [
    {
      id: 1,
      title: 'Открытие нового филиала CA store Махтумкули в Ташкенте!',
      date: '31 января 2025',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Новости',
    },
    {
      id: 2,
      title: 'Новое поступление PlayStation 5 и аксессуары',
      date: '10 марта 2025',
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Новости',
    },
    {
      id: 3,
      title: 'Компания BERG уверенно занимает свои позиции в нашей сети магазинов CA Store',
      description: 'Компания BERG уверенно занимает свои позиции в нашей сети магазинов CA Store, становясь...',
      date: '31 января 2025',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Обзоры',
    },
    {
      id: 4,
      title: 'Руководство по выбору смартфона в 2025 году',
      date: '15 марта 2025',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
      category: 'Обзоры',
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
    if (this.activeCategory === 'Все' || this.activeCategory === 'Все публикации') {
      this.filteredPublications = [...this.publications];
    } else {
      this.filteredPublications = this.publications.filter((pub) => pub.category === this.activeCategory);
    }
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
