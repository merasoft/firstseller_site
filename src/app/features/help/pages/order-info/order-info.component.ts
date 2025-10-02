import { Component } from '@angular/core';

interface OrderStep {
  step: number;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  tips: string[];
}

interface OrderMethod {
  nameKey: string;
  descriptionKey: string;
  icon: string;
  color: string;
  features: string[];
}

@Component({
  selector: 'app-order-info',
  standalone: false,
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss'],
})
export class OrderInfoComponent {
  orderSteps: OrderStep[] = [
    {
      step: 1,
      titleKey: 'ORDER_INFO.STEP_1_TITLE',
      descriptionKey: 'ORDER_INFO.STEP_1_DESC',
      icon: 'pi-search',
      tips: ['ORDER_INFO.STEP_1_TIP_1', 'ORDER_INFO.STEP_1_TIP_2'],
    },
    {
      step: 2,
      titleKey: 'ORDER_INFO.STEP_2_TITLE',
      descriptionKey: 'ORDER_INFO.STEP_2_DESC',
      icon: 'pi-shopping-cart',
      tips: ['ORDER_INFO.STEP_2_TIP_1', 'ORDER_INFO.STEP_2_TIP_2'],
    },
    {
      step: 3,
      titleKey: 'ORDER_INFO.STEP_3_TITLE',
      descriptionKey: 'ORDER_INFO.STEP_3_DESC',
      icon: 'pi-user',
      tips: ['ORDER_INFO.STEP_3_TIP_1', 'ORDER_INFO.STEP_3_TIP_2'],
    },
    {
      step: 4,
      titleKey: 'ORDER_INFO.STEP_4_TITLE',
      descriptionKey: 'ORDER_INFO.STEP_4_DESC',
      icon: 'pi-credit-card',
      tips: ['ORDER_INFO.STEP_4_TIP_1', 'ORDER_INFO.STEP_4_TIP_2'],
    },
    {
      step: 5,
      titleKey: 'ORDER_INFO.STEP_5_TITLE',
      descriptionKey: 'ORDER_INFO.STEP_5_DESC',
      icon: 'pi-check',
      tips: ['ORDER_INFO.STEP_5_TIP_1', 'ORDER_INFO.STEP_5_TIP_2'],
    },
  ];

  orderMethods: OrderMethod[] = [
    {
      nameKey: 'ORDER_INFO.ONLINE_ORDER',
      descriptionKey: 'ORDER_INFO.ONLINE_DESC',
      icon: 'pi-globe',
      color: 'blue',
      features: ['ORDER_INFO.ONLINE_FEATURE_1', 'ORDER_INFO.ONLINE_FEATURE_2', 'ORDER_INFO.ONLINE_FEATURE_3', 'ORDER_INFO.ONLINE_FEATURE_4'],
    },
    {
      nameKey: 'ORDER_INFO.PHONE_ORDER',
      descriptionKey: 'ORDER_INFO.PHONE_DESC',
      icon: 'pi-phone',
      color: 'green',
      features: ['ORDER_INFO.PHONE_FEATURE_1', 'ORDER_INFO.PHONE_FEATURE_2', 'ORDER_INFO.PHONE_FEATURE_3', 'ORDER_INFO.PHONE_FEATURE_4'],
    },
    {
      nameKey: 'ORDER_INFO.STORE_ORDER',
      descriptionKey: 'ORDER_INFO.STORE_DESC',
      icon: 'pi-home',
      color: 'purple',
      features: ['ORDER_INFO.STORE_FEATURE_1', 'ORDER_INFO.STORE_FEATURE_2', 'ORDER_INFO.STORE_FEATURE_3', 'ORDER_INFO.STORE_FEATURE_4'],
    },
  ];

  constructor() {}
}
