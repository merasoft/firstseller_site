import { Component } from '@angular/core';

interface SitemapSection {
  titleKey: string;
  links: SitemapLink[];
}

interface SitemapLink {
  nameKey?: string;
  name?: string;
  url: string;
  description?: string;
}

@Component({
  selector: 'app-sitemap',
  standalone: false,
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.scss'],
})
export class SitemapComponent {
  sitemapSections: SitemapSection[] = [
    {
      titleKey: 'SITEMAP.MAIN_PAGES',
      links: [
        { nameKey: 'SITEMAP.HOME', url: '/home' },
        { nameKey: 'SITEMAP.CATALOG', url: '/catalog' },
        { nameKey: 'SITEMAP.WISHLIST', url: '/wishlist' },
        { nameKey: 'SITEMAP.COMPARE', url: '/compare' },
        { nameKey: 'SITEMAP.PUBLICATIONS', url: '/publications' },
      ],
    },
    {
      titleKey: 'SITEMAP.POPULAR_CATEGORIES',
      links: [
        { name: 'Ноутбуки', url: '/catalog/laptops' },
        { name: 'Велосипеды', url: '/catalog/bicycles' },
        { name: 'Телефоны', url: '/catalog/phones' },
        { name: 'Планшеты', url: '/catalog/tablets' },
        { name: 'Умные часы', url: '/catalog/smartwatches' },
        { name: 'Колонки', url: '/catalog/speakers' },
        { name: 'Бытовая техника', url: '/catalog/appliances' },
        { name: 'Парфюмерия', url: '/catalog/perfume' },
      ],
    },
    {
      titleKey: 'SITEMAP.COMPANY_INFO',
      links: [
        { nameKey: 'SITEMAP.ABOUT_US', url: '/site/about' },
        { nameKey: 'SITEMAP.DELIVERY', url: '/site/delivery' },
        { nameKey: 'SITEMAP.PAYMENT', url: '/site/payment' },
        { nameKey: 'SITEMAP.WARRANTY', url: '/site/warranty' },
        { nameKey: 'SITEMAP.CONTACT', url: '/site/contact' },
      ],
    },
    {
      titleKey: 'SITEMAP.HELP_SUPPORT',
      links: [
        { nameKey: 'SITEMAP.FAQ', url: '/help/faq' },
        { nameKey: 'SITEMAP.ORDER_INFO', url: '/help/order-info' },
        { nameKey: 'SITEMAP.SERVICES', url: '/help/services' },
        { nameKey: 'SITEMAP.WARRANTY_SERVICE', url: '/help/warranty-service' },
        { nameKey: 'SITEMAP.RETURN_EXCHANGE', url: '/help/return-exchange' },
      ],
    },
  ];

  constructor() {}
}
