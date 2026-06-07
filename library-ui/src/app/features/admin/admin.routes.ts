import { Routes } from '@angular/router';
import { AdminMain } from './pages/admin-main/admin-main';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path:'',
    component: AdminMain,
    children:[
        {
          path: 'users',
          loadComponent: () =>
            import('./pages/admin-users/admin-users')
              .then(c => c.AdminUsers)
        },
        {
          path: 'books',
          loadComponent: () =>
            import('./pages/admin-books/admin-books')
              .then(c => c.AdminBooks)
        },

        {
          path:'borrowed-books',
          loadComponent: () => 
              import('./pages/admin-borrowed-books/admin-borrowed-books')
                .then(c => c.AdminBorrowedBooks)
        },{
          path:'departments',
          loadComponent:()=> 
            import('../../shared/components/department-list/department-list')
              .then(c => c.DepartmentList )
        }
    ]
  }

 
];