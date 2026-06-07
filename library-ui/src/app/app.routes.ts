import { Routes } from '@angular/router';
import { Auth } from './layouts/auth/auth';
import { Main } from './layouts/main/main';
import { NotFound } from './layouts/not-found/not-found';
import { loginGuard } from './guards/loginGuard';
import { authGuard } from './guards/authGuard';
import { roleGuard } from './guards/roleGuard';

export const routes: Routes = [
    {
        path:'auth',
        component: Auth,
        canActivate:[loginGuard]
    },
    {
        path:"",
        component: Main,
        canActivate:[authGuard]
    },

    {
        path: 'admin',
        loadChildren: () =>
        import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] }
    },
    {
        path: 'librarian',
        loadChildren: () =>
        import('./features/librarian/librarian.routes').then(m => m.LIBRARIAN_ROUTES),
        canActivate: [roleGuard],
        data: { roles: ['LIBRARIAN'] }
    },
    {
        path: 'user',
        loadChildren: () =>
        import('./features/user/user.routes').then(m => m.USER_ROUTES),
        canActivate: [roleGuard],
        data: { roles: ['USER'] }
    },

    {
        path:"**",
        component: NotFound
    }
];
