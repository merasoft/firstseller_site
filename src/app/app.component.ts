import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Carousel } from 'primeng/carousel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'firstseller-site';

  constructor(private translate: TranslateService) {
    // Configure supported languages
    translate.addLangs(['ru', 'en', 'uz']);
    translate.setDefaultLang('ru');

    // Get browser language or use default
    const browserLang = translate.getBrowserLang();
    const lang = browserLang && ['ru', 'en', 'uz'].includes(browserLang) ? browserLang : 'ru';
    translate.use(lang);

    Carousel.prototype.onTouchMove = function (event: TouchEvent) {
      const touch = event.touches[0];
      const deltaX = touch.clientX - this.startPos.x;
      const deltaY = touch.clientY - this.startPos.y;

      if (Math.abs(deltaX) > Math.abs(deltaY) && event.cancelable) {
        event.preventDefault();
      }
    };
  }
}
