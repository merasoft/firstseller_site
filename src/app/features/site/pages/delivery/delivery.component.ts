import { Component } from '@angular/core';

interface DeliveryStep {
  icon: string;
  color: string;
  titleKey: string;
  descriptionKey: string;
}

interface DeliveryZone {
  zone: string;
  price: string;
  time: string;
}

interface DeliveryTerm {
  icon: string;
  iconColor: string;
  textKey: string;
}

@Component({
  selector: 'app-delivery',
  standalone: false,
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent {
  deliverySteps: DeliveryStep[] = [
    {
      icon: 'pi-shopping-cart',
      color: 'green',
      titleKey: 'DELIVERY.STEP_1_TITLE',
      descriptionKey: 'DELIVERY.STEP_1_DESCRIPTION',
    },
    {
      icon: 'pi-cog',
      color: 'blue',
      titleKey: 'DELIVERY.STEP_2_TITLE',
      descriptionKey: 'DELIVERY.STEP_2_DESCRIPTION',
    },
    {
      icon: 'pi-truck',
      color: 'purple',
      titleKey: 'DELIVERY.STEP_3_TITLE',
      descriptionKey: 'DELIVERY.STEP_3_DESCRIPTION',
    },
  ];

  deliveryZones: DeliveryZone[] = [
    {
      zone: 'DELIVERY.ZONE_1',
      price: '15,000',
      time: 'DELIVERY.TIME_1_2_DAYS',
    },
    {
      zone: 'DELIVERY.ZONE_2',
      price: '25,000',
      time: 'DELIVERY.TIME_2_3_DAYS',
    },
    {
      zone: 'DELIVERY.ZONE_3',
      price: '35,000',
      time: 'DELIVERY.TIME_3_5_DAYS',
    },
  ];

  generalTerms: DeliveryTerm[] = [
    { icon: 'pi-check', iconColor: 'text-green-400', textKey: 'DELIVERY.TERM_1' },
    { icon: 'pi-check', iconColor: 'text-green-400', textKey: 'DELIVERY.TERM_2' },
    { icon: 'pi-check', iconColor: 'text-green-400', textKey: 'DELIVERY.TERM_3' },
    { icon: 'pi-check', iconColor: 'text-green-400', textKey: 'DELIVERY.TERM_4' },
  ];

  specialConditions: DeliveryTerm[] = [
    { icon: 'pi-info-circle', iconColor: 'text-yellow-400', textKey: 'DELIVERY.SPECIAL_1' },
    { icon: 'pi-info-circle', iconColor: 'text-yellow-400', textKey: 'DELIVERY.SPECIAL_2' },
    { icon: 'pi-info-circle', iconColor: 'text-yellow-400', textKey: 'DELIVERY.SPECIAL_3' },
    { icon: 'pi-info-circle', iconColor: 'text-yellow-400', textKey: 'DELIVERY.SPECIAL_4' },
  ];

  constructor() {}
}
