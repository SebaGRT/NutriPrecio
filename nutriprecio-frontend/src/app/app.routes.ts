import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'search',
    loadComponent: () => import('./features/search/search.component').then(m => m.SearchComponent),
  },
  {
    path: 'products/:slug',
    loadComponent: () => import('./features/product/product-detail.component').then(m => m.ProductDetailComponent),
  },
  {
    path: 'stores',
    loadComponent: () => import('./features/stores/store-list.component').then(m => m.StoreListComponent),
  },
  {
    path: 'stores/:slug',
    loadComponent: () => import('./features/stores/store-list.component').then(m => m.StoreListComponent),
  },
  {
    path: 'compare',
    loadComponent: () => import('./features/compare/compare.component').then(m => m.CompareComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
