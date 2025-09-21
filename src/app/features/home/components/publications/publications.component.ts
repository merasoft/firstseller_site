// src/app/features/home/components/publications/publications.component.ts
import { Component, OnInit } from '@angular/core';

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

  categories: string[] = ['Все', 'Обзоры', 'Новости', 'Все публикации'];

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
      title: 'Новое поступление стиральных машин Hisense',
      date: '10 марта 2025',
      image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Новости',
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
    console.log('Открытие публикации:', publication.title);
    // Navigate to publication detail page
  }
}
