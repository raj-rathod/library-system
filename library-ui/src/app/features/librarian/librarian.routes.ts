import { Routes } from '@angular/router';
import { LibrarianMain } from './pages/librarian-main/librarian-main';

export const LIBRARIAN_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path:'',
    component: LibrarianMain,
    children:[
        {
          path: 'books',
          loadComponent: () =>
            import('../admin/pages/admin-books/admin-books')
              .then(c => c.AdminBooks)
        },
        {
          path: 'borrowed-books',
          loadComponent: () =>
            import('../admin/pages/admin-borrowed-books/admin-borrowed-books')
              .then(c => c.AdminBorrowedBooks)
        },
        {
          path:'departments',
          loadComponent: () =>
            import('../../shared/components/department-list/department-list')
               .then(c => c.DepartmentList)
          
        }
    ]

  },
];