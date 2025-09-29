// src/app/shared/services/language.service.ts
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('ru');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  public languages: Language[] = [
    { code: 'ru', name: 'Русский', flag: 'flag_ru.png' },
    { code: 'en', name: 'English', flag: 'flag_en.png' },
    { code: 'uz', name: "O'zbekcha", flag: 'flag_uz.png' },
  ];

  constructor(private translate: TranslateService) {
    // Load saved language from localStorage or use default
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'ru';
    this.setLanguage(savedLanguage);
  }

  setLanguage(languageCode: string): void {
    if (this.languages.some((lang) => lang.code === languageCode)) {
      this.translate.use(languageCode);
      this.currentLanguageSubject.next(languageCode);
      localStorage.setItem('selectedLanguage', languageCode);
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  getCurrentLanguageData(): Language | undefined {
    return this.languages.find((lang) => lang.code === this.getCurrentLanguage());
  }

  getLanguageByCode(code: string): Language | undefined {
    return this.languages.find((lang) => lang.code === code);
  }
}
