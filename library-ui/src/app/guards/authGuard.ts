import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return router.createUrlTree(['/auth']);
  }

  switch (role) {
    case 'ADMIN':
      return router.createUrlTree(['/admin/users']);

    case 'LIBRARIAN':
      return router.createUrlTree(['/librarian/books']);

    case 'USER':
      return router.createUrlTree(['/user/books']);

    default:
      localStorage.clear();
      return router.createUrlTree(['/auth']);
  }
};