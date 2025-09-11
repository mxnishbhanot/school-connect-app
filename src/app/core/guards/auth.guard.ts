import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const role = localStorage.getItem('role');
  if (!role) {
    return router.parseUrl('/auth');
  }
  if (role === 'teacher' && state.url !== '/teacher') {
    return router.parseUrl('/teacher');
  }
  if (role === 'parent' && state.url !== '/parent') {
    return router.parseUrl('/parent');
  }
  if (role === 'admin' && state.url !== '/admin') {
    return router.parseUrl('/admin');
  }
  return true;
};
