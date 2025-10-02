import { Component } from '@angular/core';

interface FAQItem {
  questionKey: string;
  answerKey: string;
  category: string;
}

interface FAQCategory {
  titleKey: string;
  icon: string;
  faqs: FAQItem[];
}

@Component({
  selector: 'app-faq',
  standalone: false,
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent {
  faqCategories: FAQCategory[] = [
    {
      titleKey: 'FAQ.ORDERING',
      icon: 'pi-shopping-cart',
      faqs: [
        {
          questionKey: 'FAQ.ORDERING_Q1',
          answerKey: 'FAQ.ORDERING_A1',
          category: 'ordering',
        },
        {
          questionKey: 'FAQ.ORDERING_Q2',
          answerKey: 'FAQ.ORDERING_A2',
          category: 'ordering',
        },
        {
          questionKey: 'FAQ.ORDERING_Q3',
          answerKey: 'FAQ.ORDERING_A3',
          category: 'ordering',
        },
      ],
    },
    {
      titleKey: 'FAQ.DELIVERY',
      icon: 'pi-truck',
      faqs: [
        {
          questionKey: 'FAQ.DELIVERY_Q1',
          answerKey: 'FAQ.DELIVERY_A1',
          category: 'delivery',
        },
        {
          questionKey: 'FAQ.DELIVERY_Q2',
          answerKey: 'FAQ.DELIVERY_A2',
          category: 'delivery',
        },
        {
          questionKey: 'FAQ.DELIVERY_Q3',
          answerKey: 'FAQ.DELIVERY_A3',
          category: 'delivery',
        },
      ],
    },
    {
      titleKey: 'FAQ.PAYMENT',
      icon: 'pi-credit-card',
      faqs: [
        {
          questionKey: 'FAQ.PAYMENT_Q1',
          answerKey: 'FAQ.PAYMENT_A1',
          category: 'payment',
        },
        {
          questionKey: 'FAQ.PAYMENT_Q2',
          answerKey: 'FAQ.PAYMENT_A2',
          category: 'payment',
        },
        {
          questionKey: 'FAQ.PAYMENT_Q3',
          answerKey: 'FAQ.PAYMENT_A3',
          category: 'payment',
        },
      ],
    },
    {
      titleKey: 'FAQ.RETURNS',
      icon: 'pi-refresh',
      faqs: [
        {
          questionKey: 'FAQ.RETURNS_Q1',
          answerKey: 'FAQ.RETURNS_A1',
          category: 'returns',
        },
        {
          questionKey: 'FAQ.RETURNS_Q2',
          answerKey: 'FAQ.RETURNS_A2',
          category: 'returns',
        },
        {
          questionKey: 'FAQ.RETURNS_Q3',
          answerKey: 'FAQ.RETURNS_A3',
          category: 'returns',
        },
      ],
    },
  ];

  constructor() {}
}
