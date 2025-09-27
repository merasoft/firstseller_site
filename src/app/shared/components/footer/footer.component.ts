// src/app/shared/components/footer/footer.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  // Footer links sections
  footerSections = [
    {
      title: 'Быстрые ссылки',
      links: [
        { name: 'О нас', url: '/about' },
        { name: 'Доставка', url: '/delivery' },
        { name: 'Способы оплаты', url: '/payment' },
        { name: 'Гарантия', url: '/warranty' },
        { name: 'Контакты', url: '/contact' },
      ],
    },
    {
      title: 'Категории',
      links: [
        { name: 'Телефоны и гаджеты', url: '/catalog/smartphones' },
        { name: 'Ноутбуки', url: '/catalog/laptops' },
        { name: 'Телевизоры', url: '/catalog/tv' },
        { name: 'Бытовая техника', url: '/catalog/appliances' },
        { name: 'Аксессуары', url: '/catalog/accessories' },
      ],
    },
  ];

  // Social media links
  socialLinks = [
    {
      name: 'Facebook',
      icon: 'facebook',
      url: 'https://facebook.com/firstseller',
      color: 'bg-blue-600',
    },
    {
      name: 'Telegram',
      icon: 'telegram',
      url: 'https://t.me/firstseller',
      color: 'bg-blue-500',
    },
    {
      name: 'Instagram',
      icon: 'instagram',
      url: 'https://instagram.com/firstseller',
      color: 'bg-pink-600',
    },
    {
      name: 'YouTube',
      icon: 'youtube',
      url: 'https://youtube.com/firstseller',
      color: 'bg-red-600',
    },
  ];

  // App download links
  appDownloads = [
    {
      name: 'App Store',
      image: '/assets/images/app-store.png',
      url: 'https://apps.apple.com/app/firstseller',
    },
    {
      name: 'Google Play',
      image: '/assets/images/google-play.png',
      url: 'https://play.google.com/store/apps/details?id=uz.firstseller',
    },
  ];

  currentYear = new Date().getFullYear();

  onSocialClick(social: any): void {
    window.open(social.url, '_blank');
  }

  onAppDownloadClick(app: any): void {
    window.open(app.url, '_blank');
  }

  onLinkClick(link: any): void {
    // Handle navigation
    console.log('Navigate to:', link.url);
  }
}
