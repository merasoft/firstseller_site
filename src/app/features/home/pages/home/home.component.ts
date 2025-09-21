import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  currentSlide = 0;
  totalSlides = 3;
  autoSlideInterval: any;

  ngOnInit() {
    this.startAutoSlide();
    this.initializeCarousel();
  }

  ngOnDestroy() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  initializeCarousel() {
    // DOM загрузка кутиш учун
    setTimeout(() => {
      this.setupCarouselEvents();
    }, 100);
  }

  setupCarouselEvents() {
    // Dots events
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.goToSlide(index);
      });
    });

    // Navigation arrows
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.previousSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.nextSlide();
      });
    }
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Har 5 soniyada avtomatik o'tish
  }

  goToSlide(slideIndex: number) {
    this.currentSlide = slideIndex;
    this.updateCarousel();
    this.restartAutoSlide();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateCarousel();
  }

  previousSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
    this.updateCarousel();
  }

  updateCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');

    // Slidelarni yangilash
    slides.forEach((slide, index) => {
      if (index === this.currentSlide) {
        slide.classList.remove('opacity-0');
        slide.classList.add('opacity-100');
      } else {
        slide.classList.remove('opacity-100');
        slide.classList.add('opacity-0');
      }
    });

    // Dotslarni yangilash
    dots.forEach((dot, index) => {
      if (index === this.currentSlide) {
        dot.classList.add('active');
        dot.classList.remove('bg-white/50');
        dot.classList.add('bg-white');
      } else {
        dot.classList.remove('active');
        dot.classList.remove('bg-white');
        dot.classList.add('bg-white/50');
      }
    });
  }

  restartAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
    this.startAutoSlide();
  }

}
