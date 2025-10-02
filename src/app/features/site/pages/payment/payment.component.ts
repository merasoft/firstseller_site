import { Component } from '@angular/core';

interface PaymentMethod {
  name: string;
  icon: string;
  description: string;
  color: string;
}

interface InstallmentPlan {
  months: number;
  rate: string;
}

interface SecurityFeature {
  icon: string;
  color: string;
  titleKey: string;
  descriptionKey: string;
}

interface PaymentStep {
  step: number;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  color: string;
}

interface FAQ {
  questionKey: string;
  answerKey: string;
}

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  faq_id = '0';

  paymentMethods: PaymentMethod[] = [
    {
      name: 'PAYMENT.CASH',
      icon: 'pi-money-bill',
      description: 'PAYMENT.CASH_DESCRIPTION',
      color: 'green',
    },
    {
      name: 'PAYMENT.CARD',
      icon: 'pi-credit-card',
      description: 'PAYMENT.CARD_DESCRIPTION',
      color: 'blue',
    },
    {
      name: 'PAYMENT.BANK_TRANSFER',
      icon: 'pi-building',
      description: 'PAYMENT.BANK_DESCRIPTION',
      color: 'purple',
    },
    {
      name: 'PAYMENT.INSTALLMENT',
      icon: 'pi-calendar',
      description: 'PAYMENT.INSTALLMENT_DESCRIPTION',
      color: 'orange',
    },
  ];

  installmentPlans: InstallmentPlan[] = [
    { months: 3, rate: '0%' },
    { months: 6, rate: '0%' },
    { months: 9, rate: '0%' },
    { months: 12, rate: '0%' },
  ];

  securityFeatures: SecurityFeature[] = [
    {
      icon: 'pi-shield',
      color: 'green',
      titleKey: 'PAYMENT.SSL_PROTECTION',
      descriptionKey: 'PAYMENT.SSL_DESCRIPTION',
    },
    {
      icon: 'pi-lock',
      color: 'blue',
      titleKey: 'PAYMENT.DATA_ENCRYPTION',
      descriptionKey: 'PAYMENT.ENCRYPTION_DESCRIPTION',
    },
    {
      icon: 'pi-verified',
      color: 'purple',
      titleKey: 'PAYMENT.VERIFIED_PAYMENTS',
      descriptionKey: 'PAYMENT.VERIFIED_DESCRIPTION',
    },
  ];

  paymentSteps: PaymentStep[] = [
    {
      step: 1,
      titleKey: 'PAYMENT.STEP_1',
      descriptionKey: 'PAYMENT.STEP_1_DESC',
      icon: 'pi-shopping-cart',
      color: 'green',
    },
    {
      step: 2,
      titleKey: 'PAYMENT.STEP_2',
      descriptionKey: 'PAYMENT.STEP_2_DESC',
      icon: 'pi-credit-card',
      color: 'green',
    },
    {
      step: 3,
      titleKey: 'PAYMENT.STEP_3',
      descriptionKey: 'PAYMENT.STEP_3_DESC',
      icon: 'pi-shield',
      color: 'green',
    },
    {
      step: 4,
      titleKey: 'PAYMENT.STEP_4',
      descriptionKey: 'PAYMENT.STEP_4_DESC',
      icon: 'pi-check',
      color: 'green',
    },
  ];

  faqItems: FAQ[] = [
    {
      questionKey: 'PAYMENT.FAQ_1_Q',
      answerKey: 'PAYMENT.FAQ_1_A',
    },
    {
      questionKey: 'PAYMENT.FAQ_2_Q',
      answerKey: 'PAYMENT.FAQ_2_A',
    },
    {
      questionKey: 'PAYMENT.FAQ_3_Q',
      answerKey: 'PAYMENT.FAQ_3_A',
    },
    {
      questionKey: 'PAYMENT.FAQ_4_Q',
      answerKey: 'PAYMENT.FAQ_4_A',
    },
  ];

  constructor() {}
}
