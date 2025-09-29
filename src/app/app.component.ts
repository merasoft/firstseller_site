import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'firstseller-site';

  constructor(private translate: TranslateService) {
    // Configure supported languages
    translate.addLangs(['ru', 'en', 'uz']);
    translate.setDefaultLang('ru');

    // Get browser language or use default
    const browserLang = translate.getBrowserLang();
    const lang = browserLang && ['ru', 'en', 'uz'].includes(browserLang) ? browserLang : 'ru';
    translate.use(lang);
  }

  ngOnInit(): void {
    // Additional initialization if needed
  }
}
