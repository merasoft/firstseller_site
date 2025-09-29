// src/app/features/home/pages/publications/publications-page.component.ts
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
  author?: string;
  readTime?: number;
  featured?: boolean;
}

@Component({
  selector: 'app-publications-page',
  standalone: false,
  templateUrl: './publications-page.component.html',
  styleUrls: ['./publications-page.component.scss'],
})
export class PublicationsPageComponent implements OnInit {
  // Filter and search properties
  activeCategory: string = 'Все';
  searchQuery: string = '';
  isLoading: boolean = false;

  // Modal properties
  displayPublicationModal: boolean = false;
  selectedPublication: Publication | null = null;

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalPages: number = 1;

  categories: string[] = ['Все', 'Новости', 'Обзоры', 'Руководства', 'Акции', 'События'];

  publications: Publication[] = [
    {
      id: 1,
      title: 'Открытие нового филиала CA store Махтумкули в Ташкенте!',
      description: 'Мы рады сообщить об открытии нашего нового современного магазина в престижном районе города. Новый филиал предлагает широкий ассортимент техники и электроники.',
      date: '2025-01-31',
      author: 'Команда CA Store',
      readTime: 3,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Новости',
      featured: true,
    },
    {
      id: 2,
      title: 'Новое поступление PlayStation 5 и аксессуары',
      description: 'В наших магазинах появились долгожданные игровые консоли PlayStation 5, а также полный ассортимент игр и аксессуаров для незабываемого игрового опыта.',
      date: '2025-03-10',
      author: 'Отдел игровых консолей',
      readTime: 5,
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Новости',
      featured: true,
    },
    {
      id: 3,
      title: 'Компания BERG уверенно занимает свои позиции в нашей сети магазинов CA Store',
      description: 'Компания BERG уверенно занимает свои позиции в нашей сети магазинов CA Store, становясь одним из ведущих поставщников качественной бытовой техники.',
      date: '2025-01-31',
      author: 'Партнерский отдел',
      readTime: 4,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Обзоры',
    },
    {
      id: 4,
      title: 'Новое поступление стиральных машин Hisense',
      description: 'Обновленная линейка стиральных машин Hisense с улучшенными функциями энергосбережения и инновационными технологиями стирки.',
      date: '2025-03-10',
      author: 'Отдел бытовой техники',
      readTime: 6,
      image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Новости',
    },
    {
      id: 5,
      title: 'Руководство по выбору смартфона в 2025 году',
      description: 'Подробное руководство, которое поможет вам выбрать идеальный смартфон, учитывая ваши потребности, бюджет и предпочтения в использовании.',
      date: '2025-02-15',
      author: 'Экспертная команда',
      readTime: 12,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Руководства',
      featured: true,
    },
    {
      id: 6,
      title: 'Большая весенняя распродажа - скидки до 50%',
      description: 'Не пропустите нашу грандиозную весеннюю распродажу! Скидки на тысячи товаров - от смартфонов до бытовой техники.',
      date: '2025-03-01',
      author: 'Отдел маркетинга',
      readTime: 2,
      image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Акции',
    },
    {
      id: 7,
      title: 'Обзор новых наушников Apple AirPods Pro 3',
      description: 'Детальный обзор последней модели беспроводных наушников от Apple с анализом всех новых функций и улучшений.',
      date: '2025-02-28',
      author: 'Технический обозреватель',
      readTime: 8,
      image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Обзоры',
    },
    {
      id: 8,
      title: 'Конференция CA Store 2025: инновации в ритейле',
      description: 'Приглашаем на ежегодную конференцию, где мы расскажем о планах развития и новых технологиях в сфере розничной торговли.',
      date: '2025-04-15',
      author: 'Организационный комитет',
      readTime: 3,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'События',
    },
    {
      id: 9,
      title: 'Как настроить умный дом: пошаговое руководство',
      description: 'Полное руководство по созданию системы умного дома - от выбора устройств до их настройки и интеграции.',
      date: '2025-02-20',
      author: 'Эксперт по IoT',
      readTime: 15,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Руководства',
    },
    {
      id: 10,
      title: 'Новая коллекция умных часов Samsung Galaxy Watch 7',
      description: 'Обзор новинок от Samsung в категории умных часов с анализом функций здоровья и фитнеса.',
      date: '2025-03-05',
      author: 'Команда обозревателей',
      readTime: 7,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Обзоры',
    },
    {
      id: 11,
      title: 'CA Store расширяет сеть доставки по всему Узбекистану',
      description: 'Мы значительно расширили географию доставки и теперь доставляем товары в самые отдаленные регионы страны.',
      date: '2025-01-20',
      author: 'Логистический отдел',
      readTime: 4,
      image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Новости',
    },
    {
      id: 12,
      title: 'Выбираем холодильник: на что обратить внимание',
      description: 'Подробное руководство по выбору холодильника с учетом размера семьи, энергопотребления и дополнительных функций.',
      date: '2025-02-10',
      author: 'Консультант по бытовой технике',
      readTime: 10,
      image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Руководства',
    },
    {
      id: 4,
      title: 'Руководство по выбору смартфона в 2025 году',
      description: 'Подробное руководство по выбору идеального смартфона с учетом всех современных технологий и потребностей пользователей.',
      date: '2025-03-15',
      author: 'Tech Expert',
      readTime: 8,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
      category: 'Руководства',
      featured: true,
    },
  ];

  // Computed properties
  filteredPublications: Publication[] = [];
  paginatedPublications: Publication[] = [];
  featuredPublications: Publication[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.featuredPublications = this.publications.filter((pub) => pub.featured);
    this.filterPublications();
  }

  setActiveCategory(category: string): void {
    this.activeCategory = category;
    this.currentPage = 1;
    this.filterPublications();
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.filterPublications();
  }

  private filterPublications(): void {
    let filtered = [...this.publications];

    // Filter by category
    if (this.activeCategory !== 'Все') {
      filtered = filtered.filter((pub) => pub.category === this.activeCategory);
    }

    // Filter by search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter((pub) => pub.title.toLowerCase().includes(query) || pub.description?.toLowerCase().includes(query) || pub.category.toLowerCase().includes(query));
    }

    this.filteredPublications = filtered;
    this.totalPages = Math.ceil(this.filteredPublications.length / this.itemsPerPage);
    this.updatePaginatedPublications();
  }

  private updatePaginatedPublications(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPublications = this.filteredPublications.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedPublications();
    }
  }

  getVisiblePages(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  getCategoryBadgeClass(category: string): string {
    const classes: { [key: string]: string } = {
      Новости: 'bg-blue-500',
      Обзоры: 'bg-purple-500',
      Руководства: 'bg-green-500',
      Акции: 'bg-red-500',
      События: 'bg-orange-500',
    };
    return classes[category] || 'bg-gray-500';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Вчера';
    if (diffDays < 7) return `${diffDays} дн. назад`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} нед. назад`;

    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  onPublicationClick(publication: Publication): void {
    this.router.navigate(['/home/publications', publication.id]);
  }
}
