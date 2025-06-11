import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { AdminGuard } from './shared/guards/admin.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path:'register',
        loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'products',
        loadComponent: () => import('./product/product-list/product-list.component').then(m => m.ProductListComponent),
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'unauthorized',
        loadComponent: () => import('./unauthorize/unauthorize.component').then(m => m.UnauthorizeComponent),
    },
    {
        path:'', redirectTo: 'products', pathMatch: 'full'
    },
    {
        path: '**', redirectTo: 'products' 
    }
];
