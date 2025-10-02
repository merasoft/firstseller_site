import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'catalog',
    loadChildren: () => import('./features/catalog/catalog.module').then((m) => m.CatalogModule),
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./features/wishlist/wishlist.module').then((m) => m.WishlistModule),
  },
  {
    path: 'site',
    loadChildren: () => import('./features/site/site.module').then((m) => m.SiteModule),
  },
  {
    path: 'help',
    loadChildren: () => import('./features/help/help.module').then((m) => m.HelpModule),
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      enableTracing: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
