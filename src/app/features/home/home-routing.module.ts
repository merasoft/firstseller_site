// src/app/features/home/home-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PublicationsPageComponent } from './pages/publications/publications-page.component';
import { PublicationDetailComponent } from './pages/publication-detail/publication-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'publications',
    component: PublicationsPageComponent,
  },
  {
    path: 'publications/:id',
    component: PublicationDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
