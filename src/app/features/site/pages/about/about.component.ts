import { Component, HostListener } from '@angular/core';

interface MissionItem {
  icon: string;
  color: string;
  titleKey: string;
  descriptionKey: string;
}

interface Statistic {
  value: string;
  labelKey: string;
}

interface TeamMember {
  nameKey: string;
  positionKey: string;
  image: string;
  descriptionKey: string;
}

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  showNavigators = false;

  responsiveOptions = [
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1,
    },
  ];

  constructor() {
    this.updateNavigatorVisibility();
  }

  @HostListener('window:resize', ['$event'])
  updateNavigatorVisibility(): void {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
      this.showNavigators = this.teamMembers.length > 2;
    } else {
      this.showNavigators = this.teamMembers.length > 3;
    }
  }

  missionItems: MissionItem[] = [
    {
      icon: 'pi-shield',
      color: 'green',
      titleKey: 'ABOUT.QUALITY',
      descriptionKey: 'ABOUT.QUALITY_DESCRIPTION',
    },
    {
      icon: 'pi-truck',
      color: 'blue',
      titleKey: 'ABOUT.DELIVERY',
      descriptionKey: 'ABOUT.DELIVERY_DESCRIPTION',
    },
    {
      icon: 'pi-users',
      color: 'purple',
      titleKey: 'ABOUT.SUPPORT',
      descriptionKey: 'ABOUT.SUPPORT_DESCRIPTION',
    },
  ];

  statistics: Statistic[] = [
    { value: '10K+', labelKey: 'ABOUT.HAPPY_CUSTOMERS' },
    { value: '5K+', labelKey: 'ABOUT.PRODUCTS' },
    { value: '50+', labelKey: 'ABOUT.BRANDS' },
    { value: '3+', labelKey: 'ABOUT.YEARS_EXPERIENCE' },
  ];

  teamMembers: TeamMember[] = [
    {
      nameKey: 'ABOUT.TEAM.AZIZBEK_NAME',
      positionKey: 'ABOUT.TEAM.CEO_POSITION',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      descriptionKey: 'ABOUT.TEAM.CEO_DESCRIPTION',
    },
    {
      nameKey: 'ABOUT.TEAM.DILNOZA_NAME',
      positionKey: 'ABOUT.TEAM.CTO_POSITION',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
      descriptionKey: 'ABOUT.TEAM.CTO_DESCRIPTION',
    },
    {
      nameKey: 'ABOUT.TEAM.BOBUR_NAME',
      positionKey: 'ABOUT.TEAM.SALES_POSITION',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      descriptionKey: 'ABOUT.TEAM.SALES_DESCRIPTION',
    },
  ];
}
