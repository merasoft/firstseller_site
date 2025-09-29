// src/app/features/home/components/advantages/advantages.component.ts
import { Component } from '@angular/core';

interface Advantage {
  id: number;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-advantages',
  standalone: false,
  templateUrl: './advantages.component.html',
  styleUrls: ['./advantages.component.scss'],
})
export class AdvantagesComponent {
  advantages: Advantage[] = [
    {
      id: 1,
      title: 'Доставка',
      description: 'Доставка осуществляется во все дни без учета выходных и праздников по Узбекистану.',
      icon: 'truck',
    },
    {
      id: 2,
      title: 'Оплата',
      description: 'Удобные способы оплаты в личном кабинете, по ID договора или через Telegram бот.',
      icon: 'credit-card',
    },
    {
      id: 3,
      title: 'Рассрочка',
      description: 'Возможность оформить покупку в рассрочку без переплат по тарифам: 0:0:3, 0:0:6, 0:0:9 и 0:0:12.',
      icon: 'clock',
    },
    {
      id: 4,
      title: 'Гарантийное обслуживание',
      description: 'Предоставляем гарантию на все товары магазина и услуги постгарантийное обслуживание.',
      icon: 'shield-check',
    },
    {
      id: 5,
      title: 'Магазины',
      description: 'Наша компания представлена в виде 14 магазинов по всему Ташкенту.',
      icon: 'shopping-cart',
    },
    {
      id: 6,
      title: 'Акции и скидки',
      description: 'У нас постоянно действуют различные акции и скидки — покупайте выгодно!',
      icon: 'percent',
    },
    {
      id: 7,
      title: 'Обмен и возврат',
      description: 'В случае покупки товара ненадлежащего качества, Вы можете произвести обмен или возврат в течении 10 дней.',
      icon: 'refresh-cw',
    },
    {
      id: 8,
      title: 'Бонусы',
      description: 'Дарим до 10% бонусов при каждой своевременной оплате обладателям бонусной карты.',
      icon: 'smile',
    },
  ];

  // Get icon path for SVG
  getIconPath(iconName: string): string {
    const icons: { [key: string]: string } = {
      truck: 'M16 3H8l-3 2v10h2v-1h12v1h2V7l-3-2zm-2 2v8H10V5h4zM6 9h2v2H6V9zm10 0h2v2h-2V9z',
      'credit-card': 'M2 4v16h20V4H2zm18 14H4V8h16v10zm0-12H4V6h16v0zM6 10h4v2H6v-2z',
      clock: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
      'shield-check': 'M12 1l-9 4v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 15l-4.24-4.24 1.41-1.42L10 13.17l6.59-6.59 1.41 1.42L10 16z',
      'shopping-cart':
        'M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z',
      percent:
        'M7.5 4C5.01 4 3 6.01 3 8.5S5.01 13 7.5 13 12 10.99 12 8.5 9.99 4 7.5 4zm0 7C6.12 11 5 9.88 5 8.5S6.12 6 7.5 6 10 7.12 10 8.5 8.88 11 7.5 11zm8.5 2c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM4.22 5.64l1.41-1.41L18.36 16.95l-1.41 1.41L4.22 5.64z',
      'refresh-cw':
        'M4 12a8 8 0 0 1 8-8V2.5L16 6l-4 3.5V8a6 6 0 0 0-6 6c0 1 .23 1.94.64 2.78l-1.46 1.46A7.93 7.93 0 0 1 4 12zm16 0a8 8 0 0 1-8 8v1.5L8 18l4-3.5V16a6 6 0 0 0 6-6c0-1-.23-1.94-.64-2.78l1.46-1.46A7.93 7.93 0 0 1 20 12z',
      smile:
        'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c.93 0 1.69.76 1.69 1.69S12.93 8.38 12 8.38s-1.69-.76-1.69-1.69S11.07 5 12 5zm0 13c-2.3 0-4.31-.99-5.73-2.56a1 1 0 1 1 1.46-1.37c1.11 1.22 2.7 1.93 4.27 1.93s3.16-.71 4.27-1.93a1 1 0 1 1 1.46 1.37C16.31 17.01 14.3 18 12 18z',
    };
    return icons[iconName] || icons['clock'];
  }
}
