import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth';

export const authGuard: CanActivateFn = async () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const autenticado = await authService.estaAutenticado();

  if (autenticado) {
    return true;
  }

  return router.createUrlTree(['/admin/login']);
};