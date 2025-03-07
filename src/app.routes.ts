import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { AuthenticationGaurds } from './auth.guard';

export const appRoutes: Routes = [
    {
        path: 'dashboard',
        component: AppLayout,
        children: [{ path: '', component: Dashboard, canActivate: [AuthenticationGaurds] }]
    },
    { path: '', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
