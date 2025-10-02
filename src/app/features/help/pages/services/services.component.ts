import { Component } from '@angular/core';

interface Service {
  nameKey: string;
  descriptionKey: string;
  icon: string;
  color: string;
  features: string[];
  price?: string;
}

interface ServiceCategory {
  titleKey: string;
  services: Service[];
}

@Component({
  selector: 'app-services',
  standalone: false,
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent {
  serviceCategories: ServiceCategory[] = [
    {
      titleKey: 'SERVICES.DELIVERY_SERVICES',
      services: [
        {
          nameKey: 'SERVICES.EXPRESS_DELIVERY',
          descriptionKey: 'SERVICES.EXPRESS_DESC',
          icon: 'pi-bolt',
          color: 'red',
          features: ['SERVICES.EXPRESS_FEATURE_1', 'SERVICES.EXPRESS_FEATURE_2'],
          price: 'SERVICES.EXPRESS_PRICE',
        },
        {
          nameKey: 'SERVICES.STANDARD_DELIVERY',
          descriptionKey: 'SERVICES.STANDARD_DESC',
          icon: 'pi-truck',
          color: 'blue',
          features: ['SERVICES.STANDARD_FEATURE_1', 'SERVICES.STANDARD_FEATURE_2'],
          price: 'SERVICES.STANDARD_PRICE',
        },
      ],
    },
    {
      titleKey: 'SERVICES.INSTALLATION_SERVICES',
      services: [
        {
          nameKey: 'SERVICES.INSTALLATION',
          descriptionKey: 'SERVICES.INSTALLATION_DESC',
          icon: 'pi-wrench',
          color: 'green',
          features: ['SERVICES.INSTALLATION_FEATURE_1', 'SERVICES.INSTALLATION_FEATURE_2'],
          price: 'SERVICES.INSTALLATION_PRICE',
        },
        {
          nameKey: 'SERVICES.SETUP',
          descriptionKey: 'SERVICES.SETUP_DESC',
          icon: 'pi-cog',
          color: 'purple',
          features: ['SERVICES.SETUP_FEATURE_1', 'SERVICES.SETUP_FEATURE_2'],
          price: 'SERVICES.SETUP_PRICE',
        },
      ],
    },
  ];

  constructor() {}
}
