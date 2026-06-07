import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    router.navigate(['/auth']);
    return false;
  }

  const allowedRoles = route.data?.['roles'] as string[];

  if (allowedRoles.includes(userRole!)) {
    return true;
  }

  // Redirect based on role
  switch (userRole) {
    case 'ADMIN':
      router.navigate(['/admin/dashboard']);
      break;

    case 'LIBRARIAN':
      router.navigate(['/librarian/dashboard']);
      break;

    case 'USER':
      router.navigate(['/user/dashboard']);
      break;

    default:
      router.navigate(['/unauthorized']);
  }

  return false;
};