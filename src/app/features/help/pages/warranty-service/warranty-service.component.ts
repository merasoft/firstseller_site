import { Component } from '@angular/core';

interface WarrantyService {
  nameKey: string;
  descriptionKey: string;
  icon: string;
  color: string;
  features: string[];
  duration: string;
}

interface WarrantyStep {
  step: number;
  titleKey: string;
  descriptionKey: string;
  icon: string;
}

interface ServiceCenter {
  city: string;
  address: string;
  phone: string;
  hours: string;
  services: string[];
}

@Component({
  selector: 'app-warranty-service',
  standalone: false,
  templateUrl: './warranty-service.component.html',
  styleUrls: ['./warranty-service.component.scss'],
})
export class WarrantyServiceComponent {
  repairableItems: string[] = [
    'WARRANTY_SERVICE.REFRIGERATORS',
    'WARRANTY_SERVICE.AIR_CONDITIONERS',
    'WARRANTY_SERVICE.WASHING_MACHINES',
    'WARRANTY_SERVICE.DISHWASHERS',
    'WARRANTY_SERVICE.GAS_ELECTRIC_STOVES',
    'WARRANTY_SERVICE.TELEVISIONS',
    'WARRANTY_SERVICE.DVD_VIDEO_EQUIPMENT',
    'WARRANTY_SERVICE.MICROWAVE_OVENS',
    'WARRANTY_SERVICE.VACUUM_CLEANERS',
    'WARRANTY_SERVICE.SMALL_APPLIANCES',
  ];

  warrantyExclusions: string[] = [
    'WARRANTY_SERVICE.EXCLUSION_1',
    'WARRANTY_SERVICE.EXCLUSION_2',
    'WARRANTY_SERVICE.EXCLUSION_3',
    'WARRANTY_SERVICE.EXCLUSION_4',
    'WARRANTY_SERVICE.EXCLUSION_5',
    'WARRANTY_SERVICE.EXCLUSION_6',
    'WARRANTY_SERVICE.EXCLUSION_7',
    'WARRANTY_SERVICE.EXCLUSION_8',
    'WARRANTY_SERVICE.EXCLUSION_9',
    'WARRANTY_SERVICE.EXCLUSION_10',
    'WARRANTY_SERVICE.EXCLUSION_11',
    'WARRANTY_SERVICE.EXCLUSION_12',
  ];

  requiredDocuments: string[] = ['WARRANTY_SERVICE.WARRANTY_CARD', 'WARRANTY_SERVICE.PURCHASE_RECEIPT', 'WARRANTY_SERVICE.PRODUCT_SERIAL'];

  requiredInfo: string[] = ['WARRANTY_SERVICE.MODEL_NAME', 'WARRANTY_SERVICE.SERIAL_NUMBER', 'WARRANTY_SERVICE.PURCHASE_DATE', 'WARRANTY_SERVICE.SELLER_INFO'];

  warrantyServices: WarrantyService[] = [
    {
      nameKey: 'WARRANTY_SERVICE.REPAIR_SERVICE',
      descriptionKey: 'WARRANTY_SERVICE.REPAIR_DESC',
      icon: 'pi-wrench',
      color: 'blue',
      features: ['WARRANTY_SERVICE.FREE_DIAGNOSIS', 'WARRANTY_SERVICE.ORIGINAL_PARTS', 'WARRANTY_SERVICE.CERTIFIED_TECHS'],
      duration: '1-2 years',
    },
    {
      nameKey: 'WARRANTY_SERVICE.REPLACEMENT_SERVICE',
      descriptionKey: 'WARRANTY_SERVICE.REPLACEMENT_DESC',
      icon: 'pi-refresh',
      color: 'green',
      features: ['WARRANTY_SERVICE.QUICK_EXCHANGE', 'WARRANTY_SERVICE.SAME_MODEL', 'WARRANTY_SERVICE.NO_COST'],
      duration: '30 days',
    },
    {
      nameKey: 'WARRANTY_SERVICE.MAINTENANCE_SERVICE',
      descriptionKey: 'WARRANTY_SERVICE.MAINTENANCE_DESC',
      icon: 'pi-cog',
      color: 'purple',
      features: ['WARRANTY_SERVICE.PREVENTIVE_CARE', 'WARRANTY_SERVICE.PERFORMANCE_CHECK', 'WARRANTY_SERVICE.CLEANING'],
      duration: 'As needed',
    },
  ];

  warrantySteps: WarrantyStep[] = [
    {
      step: 1,
      titleKey: 'WARRANTY_SERVICE.STEP_1_TITLE',
      descriptionKey: 'WARRANTY_SERVICE.STEP_1_DESC',
      icon: 'pi-phone',
    },
    {
      step: 2,
      titleKey: 'WARRANTY_SERVICE.STEP_2_TITLE',
      descriptionKey: 'WARRANTY_SERVICE.STEP_2_DESC',
      icon: 'pi-file-check',
    },
    {
      step: 3,
      titleKey: 'WARRANTY_SERVICE.STEP_3_TITLE',
      descriptionKey: 'WARRANTY_SERVICE.STEP_3_DESC',
      icon: 'pi-truck',
    },
    {
      step: 4,
      titleKey: 'WARRANTY_SERVICE.STEP_4_TITLE',
      descriptionKey: 'WARRANTY_SERVICE.STEP_4_DESC',
      icon: 'pi-check-circle',
    },
  ];

  serviceCenters: ServiceCenter[] = [
    {
      city: 'Tashkent',
      address: 'Amir Temur Street 15, Yunusabad District',
      phone: '+998 71 123 45 67',
      hours: '09:00 - 18:00',
      services: ['Repair', 'Replacement', 'Maintenance'],
    },
    {
      city: 'Samarkand',
      address: 'Registan Street 8, Center',
      phone: '+998 66 234 56 78',
      hours: '09:00 - 17:00',
      services: ['Repair', 'Maintenance'],
    },
    {
      city: 'Bukhara',
      address: 'Navoi Street 12, Old City',
      phone: '+998 65 345 67 89',
      hours: '09:00 - 17:00',
      services: ['Repair', 'Maintenance'],
    },
  ];

  constructor() {}
}
