import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Settings icon for all tabs except auth
  {
    path: 'settings',
    loadComponent: () => import('./features/user/settings/settings.component').then(m => m.SettingsComponent),
    data: { showSettingsIcon: true }
  },
  {
    path: 'settings',
    loadComponent: () => import('./features/user/settings/settings.component').then(m => m.SettingsComponent),
  },
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/auth-page/auth-page.component').then(m => m.AuthPageComponent),
  },
  {
    path: 'teacher',
    canActivate: [AuthGuard],
    loadComponent: () => import('./features/teacher/teacher-dashboard-page/teacher-dashboard-page.component').then(m => m.TeacherDashboardPageComponent),
  },
  {
    path: 'parent',
    canActivate: [AuthGuard],
    loadComponent: () => import('./features/parent/parent-dashboard-page/parent-dashboard-page.component').then(m => m.ParentDashboardPageComponent),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadComponent: () => import('./features/admin/panel/panel.component').then(m => m.PanelComponent),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
