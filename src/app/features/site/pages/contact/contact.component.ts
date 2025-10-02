import { Component } from '@angular/core';

interface ContactInfo {
  type: string;
  value: string;
  icon: string;
  color: string;
}

interface Office {
  name: string;
  address: string;
  phone: string;
  hours: string;
}

interface SocialMedia {
  name: string;
  url: string;
  icon: string;
  color: string;
}

interface QuickInfo {
  titleKey: string;
  valueKey: string;
  icon: string;
}

interface FormField {
  nameKey: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  required: boolean;
  placeholder?: string;
}

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactInfo: ContactInfo[] = [
    {
      type: 'CONTACT.PHONE',
      value: '+998 (90) 123-45-67',
      icon: 'pi-phone',
      color: 'green',
    },
    {
      type: 'CONTACT.EMAIL',
      value: 'info@firstseller.uz',
      icon: 'pi-envelope',
      color: 'blue',
    },
    {
      type: 'CONTACT.ADDRESS',
      value: 'CONTACT.ADDRESS_VALUE',
      icon: 'pi-map-marker',
      color: 'red',
    },
    {
      type: 'CONTACT.TELEGRAM',
      value: '@firstseller_uz',
      icon: 'pi-send',
      color: 'purple',
    },
  ];

  offices: Office[] = [
    {
      name: 'CONTACT.MAIN_OFFICE',
      address: 'CONTACT.MAIN_ADDRESS',
      phone: '+998 (90) 123-45-67',
      hours: 'CONTACT.WORKING_HOURS',
    },
    {
      name: 'CONTACT.BRANCH_OFFICE',
      address: 'CONTACT.BRANCH_ADDRESS',
      phone: '+998 (91) 987-65-43',
      hours: 'CONTACT.WORKING_HOURS',
    },
  ];

  socialMedia: SocialMedia[] = [
    { name: 'SOCIAL.FACEBOOK', url: '#', icon: 'pi-facebook', color: 'bg-blue-600 hover:bg-blue-700' },
    { name: 'SOCIAL.TWITTER', url: '#', icon: 'pi-twitter', color: 'bg-blue-400 hover:bg-blue-500' },
    { name: 'SOCIAL.INSTAGRAM', url: '#', icon: 'pi-instagram', color: 'bg-pink-600 hover:bg-pink-700' },
    { name: 'SOCIAL.YOUTUBE', url: '#', icon: 'pi-youtube', color: 'bg-red-600 hover:bg-red-700' },
  ];

  quickInfoItems: QuickInfo[] = [
    {
      titleKey: 'CONTACT.WORKING_HOURS',
      valueKey: 'CONTACT.HOURS_VALUE',
      icon: 'pi-clock',
    },
    {
      titleKey: 'CONTACT.CUSTOMER_SUPPORT',
      valueKey: 'CONTACT.SUPPORT_AVAILABLE',
      icon: 'pi-users',
    },
    {
      titleKey: 'CONTACT.LANGUAGES',
      valueKey: 'CONTACT.LANGUAGES_VALUE',
      icon: 'pi-globe',
    },
  ];

  formFields: FormField[] = [
    { nameKey: 'CONTACT.FIRST_NAME', type: 'text', required: true },
    { nameKey: 'CONTACT.LAST_NAME', type: 'text', required: true },
    { nameKey: 'CONTACT.EMAIL', type: 'email', required: true },
    { nameKey: 'CONTACT.PHONE', type: 'tel', required: false },
    { nameKey: 'CONTACT.SUBJECT', type: 'text', required: true },
    { nameKey: 'CONTACT.MESSAGE', type: 'textarea', required: true },
  ];

  constructor() {}
}
