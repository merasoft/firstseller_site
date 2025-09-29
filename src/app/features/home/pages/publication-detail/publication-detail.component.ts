// src/app/features/home/pages/publication-detail/publication-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { marked } from 'marked';
import { TranslateService } from '@ngx-translate/core';

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
  content?: string;
}

@Component({
  selector: 'app-publication-detail',
  standalone: false,
  templateUrl: './publication-detail.component.html',
  styleUrls: ['./publication-detail.component.scss'],
})
export class PublicationDetailComponent implements OnInit {
  publication: Publication | null = null;
  isLoading: boolean = true;
  relatedPublications: Publication[] = [];
  renderedContent: string = '';

  // Sample publications data (in a real app, this would come from a service)
  private publications: Publication[] = [
    {
      id: 1,
      title: 'Открытие нового филиала CA store Махтумкули в Ташкенте!',
      description: 'Мы рады сообщить об открытии нашего нового современного магазина в престижном районе города. Новый филиал предлагает широкий ассортимент техники и электроники.',
      date: '2025-01-31',
      author: 'Команда CA Store',
      readTime: 3,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'news',
      featured: true,
      content: `
        <p>Мы с гордостью объявляем об открытии нашего нового флагманского магазина CA Store в районе Махтумкули в Ташкенте! Этот современный торговый центр станет новой точкой притяжения для всех любителей технологий и качественной электроники.</p>
        
        <h3>Что вас ждет в новом магазине:</h3>
        <ul>
          <li><strong>Широкий ассортимент:</strong> Более 5000 наименований товаров от ведущих мировых брендов</li>
          <li><strong>Современный дизайн:</strong> Просторные залы с удобной навигацией и зонированием по категориям</li>
          <li><strong>Экспертные консультации:</strong> Квалифицированные специалисты помогут выбрать идеальное решение</li>
          <li><strong>Сервисный центр:</strong> Полный цикл обслуживания и ремонта техники</li>
          <li><strong>Удобное расположение:</strong> Легкая транспортная доступность и бесплатная парковка</li>
        </ul>
        
        <h3>Специальные предложения к открытию:</h3>
        <p>В честь открытия мы подготовили особые условия для наших покупателей:</p>
        <ul>
          <li>Скидки до 30% на всю технику Apple</li>
          <li>Бесплатная доставка по Ташкенту при покупке от 500 000 сум</li>
          <li>Рассрочка 0% на 12 месяцев</li>
          <li>Подарочные карты для первых 100 покупателей</li>
        </ul>
        
        <p>Приглашаем всех посетить наш новый магазин и оценить качество обслуживания CA Store. Мы работаем ежедневно с 9:00 до 21:00.</p>
        
        <p><strong>Адрес:</strong> г. Ташкент, ул. Махтумкули, 15<br>
        <strong>Телефон:</strong> +998 71 203 00 00</p>
      `,
    },
    {
      id: 2,
      title: 'Новое поступление PlayStation 5 и аксессуары',
      description: 'В наших магазинах появились долгожданные игровые консоли PlayStation 5, а также полный ассортимент игр и аксессуаров для незабываемого игрового опыта.',
      date: '2025-03-10',
      author: 'Отдел игровых консолей',
      readTime: 5,
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'news',
      featured: true,
      content: `
        <p>Отличные новости для всех геймеров! CA Store получил новую партию игровых консолей PlayStation 5, включая как стандартную версию, так и Digital Edition.</p>
        
        <h3>В наличии:</h3>
        <ul>
          <li>PlayStation 5 Standard Edition</li>
          <li>PlayStation 5 Digital Edition</li>
          <li>Беспроводные контроллеры DualSense</li>
          <li>PlayStation VR2</li>
          <li>Зарядные станции и аксессуары</li>
        </ul>
        
        <p>Все консоли поставляются с официальной гарантией и полным комплектом аксессуаров.</p>
      `,
    },
    {
      id: 3,
      title: 'Компания BERG уверенно занимает свои позиции в нашей сети магазинов CA Store',
      description: 'Компания BERG уверенно занимает свои позиции в нашей сети магазинов CA Store, становясь одним из ведущих поставщиков качественной бытовой техники.',
      date: '2025-01-31',
      author: 'Партнерский отдел',
      readTime: 4,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'reviews',
      content: `
        <p>Бренд BERG продолжает укреплять свои позиции в сети магазинов CA Store, предлагая высококачественную бытовую технику по доступным ценам.</p>
        
        <h3>Популярные товары BERG:</h3>
        <ul>
          <li>Холодильники с инверторным компрессором</li>
          <li>Стиральные машины с функцией пара</li>
          <li>Кондиционеры с Wi-Fi управлением</li>
          <li>Встраиваемая кухонная техника</li>
        </ul>
      `,
    },
    {
      id: 4,
      title: 'Руководство по выбору смартфона в 2025 году',
      description: 'Подробное руководство по выбору идеального смартфона с учетом всех современных технологий и потребностей пользователей.',
      date: '2025-03-15',
      author: 'Tech Expert',
      readTime: 8,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
      category: 'guides',
      featured: true,
      content: `# Руководство по выбору смартфона в 2025 году

## Введение

Выбор смартфона в 2025 году стал еще более сложной задачей из-за огромного количества доступных вариантов. В этом руководстве мы рассмотрим **ключевые факторы**, которые помогут вам принять правильное решение.

## Основные критерии выбора

### 1. Производительность

* **Процессор**: Snapdragon 8 Gen 3, Apple A18, или MediaTek Dimensity 9300
* **Оперативная память**: минимум 8GB для комфортной работы
* **Встроенная память**: от 128GB, лучше 256GB или больше

### 2. Камера

Современные смартфоны предлагают:

1. **Основная камера**: от 48MP
2. **Ультраширокоугольная**: для пейзажей
3. **Телеобъектив**: для портретов
4. **Фронтальная камера**: от 12MP

### 3. Экран

> **Важно**: Выбирайте OLED или AMOLED дисплеи с частотой обновления 120Hz для плавной работы.

### 4. Батарея

- Емкость: **минимум 4000 mAh**
- Быстрая зарядка: от 65W
- Беспроводная зарядка: желательно

## Рекомендации по брендам

### Премиум-сегмент
- **iPhone 15 Pro**: лучшая оптимизация iOS
- **Samsung Galaxy S24 Ultra**: лучший Android флагман
- **Google Pixel 8 Pro**: лучшие фото на Android

### Средний сегмент
- **OnePlus 12R**: отличная производительность
- **Xiaomi 14**: лучшее соотношение цена/качество
- **Samsung Galaxy A55**: надежность Samsung

## Заключение

При выборе смартфона учитывайте ваши **реальные потребности**. Не всегда нужен самый дорогой флагман - часто модель среднего класса полностью покроет все ваши задачи.

> 💡 **Совет**: Обязательно подержите телефон в руках перед покупкой и проверьте все функции в магазине.

---

*Удачных покупок в CA Store!* 🛒📱`,
    },
  ];

  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private translateService: TranslateService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.loadPublication(1); // TODO fix to id
    });
  }

  private loadPublication(id: number): void {
    this.isLoading = true;

    // Simulate API call delay
    setTimeout(() => {
      this.publication = this.publications.find((pub) => pub.id === id) || null;

      if (this.publication) {
        this.processContent();
        this.loadRelatedPublications();
      }

      this.isLoading = false;
    }, 500);
  }

  private processContent(): void {
    if (!this.publication?.content) {
      this.renderedContent = '';
      return;
    }

    // Check if content is markdown or HTML
    if (this.isMarkdown(this.publication.content)) {
      // Configure marked for better HTML generation
      marked.setOptions({
        breaks: true, // Convert line breaks to <br>
        gfm: true, // GitHub Flavored Markdown
      });

      // Parse markdown to HTML
      this.renderedContent = marked(this.publication.content) as string;
    } else {
      // Content is already HTML
      this.renderedContent = this.publication.content;
    }
  }

  private isMarkdown(content: string): boolean {
    // Simple heuristic to detect markdown
    // Look for common markdown patterns
    const markdownPatterns = [
      /^#{1,6}\s+/m, // Headers
      /\*\*.*?\*\*/, // Bold
      /\*.*?\*/, // Italic
      /^[\s]*[-\*\+]\s+/m, // Unordered lists
      /^[\s]*\d+\.\s+/m, // Ordered lists
      /\[.*?\]\(.*?\)/, // Links
      /```[\s\S]*?```/, // Code blocks
      /`.*?`/, // Inline code
    ];

    return markdownPatterns.some((pattern) => pattern.test(content));
  }

  private loadRelatedPublications(): void {
    if (!this.publication) return;

    // Get related publications from the same category
    this.relatedPublications = this.publications.filter((pub) => pub.id !== this.publication!.id && pub.category === this.publication!.category).slice(0, 3);

    // If not enough related publications, add from other categories
    if (this.relatedPublications.length < 3) {
      const additional = this.publications.filter((pub) => pub.id !== this.publication!.id && !this.relatedPublications.includes(pub)).slice(0, 3 - this.relatedPublications.length);

      this.relatedPublications = [...this.relatedPublications, ...additional];
    }
  }

  goBack(): void {
    this.location.back();
  }

  onRelatedPublicationClick(publication: Publication): void {
    this.router.navigate(['/home/publications', publication.id]);
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

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const currentLang = this.translateService.currentLang || 'ru';

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

  sharePublication(): void {
    if (navigator.share && this.publication) {
      navigator
        .share({
          title: this.publication.title,
          text: this.publication.description,
          url: window.location.href,
        })
        .catch(() => {
          // Fallback to copying URL
          this.copyToClipboard();
        });
    } else {
      this.copyToClipboard();
    }
  }

  private copyToClipboard(): void {
    navigator.clipboard.writeText(window.location.href).then(() => {
      // You could show a toast notification here
      console.log('URL copied to clipboard');
    });
  }
}
