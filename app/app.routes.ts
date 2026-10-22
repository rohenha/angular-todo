import { type Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),
      },
      {
        path: 'todos',
        loadComponent: () => import('./pages/todos/todos').then(m => m.TodosComponent),
      },
    ],
  },
];