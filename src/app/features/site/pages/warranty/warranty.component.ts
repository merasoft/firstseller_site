import { Component } from '@angular/core';

interface WarrantyType {
  type: string;
  duration: string;
  coverage: string;
  icon: string;
  color: string;
}

interface ClaimStep {
  step: number;
  titleKey: string;
  descriptionKey: string;
  icon: string;
}

interface CoverageItem {
  key: string;
  icon: string;
  type: 'covered' | 'not-covered';
}

interface ServiceCenter {
  nameKey: string;
  addressKey: string;
  phone: string;
  workingHoursKey: string;
}

@Component({
  selector: 'app-warranty',
  standalone: false,
  templateUrl: './warranty.component.html',
  styleUrls: ['./warranty.component.scss'],
})
export class WarrantyComponent {
  warrantyTypes: WarrantyType[] = [
    {
      type: 'WARRANTY.MANUFACTURER',
      duration: 'WARRANTY.12_MONTHS',
      coverage: 'WARRANTY.MANUFACTURER_COVERAGE',
      icon: 'pi-cog',
      color: 'blue',
    },
    {
      type: 'WARRANTY.EXTENDED',
      duration: 'WARRANTY.24_MONTHS',
      coverage: 'WARRANTY.EXTENDED_COVERAGE',
      icon: 'pi-shield',
      color: 'green',
    },
    {
      type: 'WARRANTY.PREMIUM',
      duration: 'WARRANTY.36_MONTHS',
      coverage: 'WARRANTY.PREMIUM_COVERAGE',
      icon: 'pi-star',
      color: 'purple',
    },
  ];

  claimSteps: ClaimStep[] = [
    {
      step: 1,
      titleKey: 'WARRANTY.STEP_1_TITLE',
      descriptionKey: 'WARRANTY.STEP_1_DESC',
      icon: 'pi-phone',
    },
    {
      step: 2,
      titleKey: 'WARRANTY.STEP_2_TITLE',
      descriptionKey: 'WARRANTY.STEP_2_DESC',
      icon: 'pi-file',
    },
    {
      step: 3,
      titleKey: 'WARRANTY.STEP_3_TITLE',
      descriptionKey: 'WARRANTY.STEP_3_DESC',
      icon: 'pi-wrench',
    },
    {
      step: 4,
      titleKey: 'WARRANTY.STEP_4_TITLE',
      descriptionKey: 'WARRANTY.STEP_4_DESC',
      icon: 'pi-check',
    },
  ];

  coveredItems: CoverageItem[] = [
    { key: 'WARRANTY.COVERED_1', icon: 'pi-check', type: 'covered' },
    { key: 'WARRANTY.COVERED_2', icon: 'pi-check', type: 'covered' },
    { key: 'WARRANTY.COVERED_3', icon: 'pi-check', type: 'covered' },
    { key: 'WARRANTY.COVERED_4', icon: 'pi-check', type: 'covered' },
  ];

  notCoveredItems: CoverageItem[] = [
    { key: 'WARRANTY.NOT_COVERED_1', icon: 'pi-times', type: 'not-covered' },
    { key: 'WARRANTY.NOT_COVERED_2', icon: 'pi-times', type: 'not-covered' },
    { key: 'WARRANTY.NOT_COVERED_3', icon: 'pi-times', type: 'not-covered' },
    { key: 'WARRANTY.NOT_COVERED_4', icon: 'pi-times', type: 'not-covered' },
  ];

  serviceCenters: ServiceCenter[] = [
    {
      nameKey: 'WARRANTY.MAIN_CENTER',
      addressKey: 'WARRANTY.MAIN_ADDRESS',
      phone: '+998 (71) 123-45-67',
      workingHoursKey: 'WARRANTY.WORKING_HOURS',
    },
    {
      nameKey: 'WARRANTY.BRANCH_CENTER',
      addressKey: 'WARRANTY.BRANCH_ADDRESS',
      phone: '+998 (71) 987-65-43',
      workingHoursKey: 'WARRANTY.WORKING_HOURS',
    },
  ];

  constructor() {}
}
