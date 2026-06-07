import { Routes } from '@angular/router';
import { UserMain } from './pages/user-main/user-main';

export const USER_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },

  {
    path:'',
    component: UserMain,
    children:[
      {
        path:'books',
        loadComponent: ()=> import('./pages/user-books/user-books').then(c=>c.UserBooks)  
      },
      {
        path:'borrowed-books',
        loadComponent: ()=> import('./pages/borrow-history/borrow-history').then(c => c.BorrowHistory)
      }
    ],
  }
];